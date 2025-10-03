// middleware.js
import { NextResponse } from "next/server"
import { gonePaths, gonePrefixes, goneQueryRules } from "./lib/goneLinks"

function normalize(pathname) {
  if (!pathname) return "/"
  let p = pathname.toLowerCase()
  if (p !== "/" && p.endsWith("/")) p = p.slice(0, -1)
  return p
}

function should410(url) {
  const { pathname, search } = url
  const path = normalize(pathname)

  // exact match
  if (gonePaths.has(path)) return true

  // wildcard/prefix match
  for (const pref of gonePrefixes) {
    if (path.startsWith(pref.toLowerCase())) return true
  }

  // query-specific match
  if (search && goneQueryRules.length) {
    for (const rule of goneQueryRules) {
      if (path === normalize(rule.path)) {
        // if ANY of the strings appear in the query -> 410
        if (rule.includes.some((q) => search.toLowerCase().includes(q.toLowerCase()))) {
          return true
        }
      }
    }
  }

  // also handle the same URLs WITH trailing slash
  if (path !== "/" && gonePaths.has(path.replace(/\/$/, ""))) return true

  return false
}

export function middleware(req) {
  const url = new URL(req.url)

  if (should410(url)) {
    return new NextResponse("This page has been permanently removed.", {
      status: 410,
      headers: { "Content-Type": "text/plain" },
    })
  }

  return NextResponse.next()
}

// exclude static assets, next internals, and api routes for speed
export const config = {
  matcher: ["/((?!_next|api|static|.*\\.(?:png|jpg|jpeg|gif|svg|webp|ico|css|js|map|txt)).*)"],
}
