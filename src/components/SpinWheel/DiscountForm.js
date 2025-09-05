'use client'
import React from 'react'

export default function DiscountForm({ discount, onSubmit, submitting = false }) {
  const [form, setForm] = React.useState({ name: '', contact: '', email: '' })
  const [done, setDone] = React.useState(false)

  async function handleSubmit(e) {
    e.preventDefault()
    if (!form.name.trim() || !form.contact.trim() || !/^\S+@\S+\.\S+$/.test(form.email)) {
      alert('Please fill all fields with a valid email.')
      return
    }
    if (typeof onSubmit === 'function') await onSubmit({ ...form, discount })
    setDone(true)
  }

  if (done) {
    return (
      <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-4 text-sm text-emerald-800">
        Done! We’ve saved your <b>{discount}%</b> offer. Check your inbox / SMS for details.
      </div>
    )
  }

  return (
    <div className="rounded-2xl border border-slate-200 bg-white shadow-sm ring-1 ring-black/5">
      <div className="flex items-center justify-between px-5 py-4 border-b border-slate-100">
        <div className="text-sm font-semibold text-slate-900">
          Claim your <span className="text-emerald-600">{discount}% OFF</span>
        </div>
      </div>

      {/* scroll-safe body */}
      <div className="px-5 py-4 max-h-[50vh] overflow-y-auto">
        <form onSubmit={handleSubmit} className="grid gap-4">
          <div className="grid gap-1.5">
            <label className="text-xs font-medium text-slate-600">Name</label>
            <input
              type="text"
              className="w-full rounded-xl border border-slate-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-slate-400"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              placeholder="Your full name"
              required
              autoFocus
            />
          </div>

          <div className="grid gap-1.5">
            <label className="text-xs font-medium text-slate-600">Contact No.</label>
            <input
              type="tel"
              className="w-full rounded-xl border border-slate-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-slate-400"
              value={form.contact}
              onChange={(e) => setForm({ ...form, contact: e.target.value })}
              placeholder="+92 3XX XXXXXXX"
              required
            />
          </div>

          <div className="grid gap-1.5">
            <label className="text-xs font-medium text-slate-600">Email</label>
            <input
              type="email"
              className="w-full rounded-xl border border-slate-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-slate-400"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              placeholder="you@example.com"
              required
            />
          </div>

          <button
            type="submit"
            disabled={submitting}
            className="mt-1 w-full rounded-xl bg-emerald-600 px-4 py-2 text-sm font-semibold text-white hover:brightness-95 focus:outline-none focus:ring-2 focus:ring-emerald-400 disabled:opacity-60"
          >
            {submitting ? 'Saving…' : 'Claim Discount'}
          </button>
        </form>
      </div>
    </div>
  )
}
