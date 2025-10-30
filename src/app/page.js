import Home from "@/app/(pages)/home/Home"
import Metadata from "@/components/Meta/Metadata"

// ✅ Static Metadata
const staticMeta = {
  title: "Pakistan No.1 & Best IT Training Institute in Arfa Tower Lahore",
  description: "PNY Trainings is Pakistan’s No.1 IT Trainings institute, offering 100+ certified courses in digital skills. Learn online or on-campus with expert trainers, hands-on projects, internships, and career support to achieve your professional goals",
  url: "https://www.pnytrainings.com",
  canonicalUrl: "https://www.pnytrainings.com",
  siteName: "PNY Trainings",
}

// ✅ Next.js metadata function (optional)
export async function generateMetadata() {
  return staticMeta
}

// ✅ Page Component
export default function Homepage() {
  return (
    <>
      <Metadata
        title={staticMeta.title}
        description={staticMeta.description}
        url={staticMeta.url}
        canonicalUrl={staticMeta.canonicalUrl}
        siteName={staticMeta.siteName}
      />
      <Home />
    </>
  )
}
