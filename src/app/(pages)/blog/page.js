// app/(wherever)/page.js
import HeaderSection from "@/components/HeaderSection/Headersection";
import Metadata from "@/components/Meta/Metadata";
import BlogCategory from "./Blogcategoy"; // keep this filename as your project uses

export default function Page() {
  return (
    <>
      <Metadata
        title="PNY Trainings Blog – Insights, Tips & Tutorials"
        description="Explore the PNY Trainings blog for helpful tutorials, technology insights, marketing tips, and design ideas to boost your learning and career growth."
        canonicalUrl="https://www.pnytrainings.com/blog"
      />

      {/* Optional hero/banner (image handled by HeaderSection) */}
      <HeaderSection
        pagetitle="Blogs and insights"
        shortdescription="Get knowledge with the latest blog insights."
        image="https://www.sittechno.org/userfiles/image/success1.jpg"
        fullScreen={false}
      />

      {/* Client-side listing with pagination */}
      <section className="mx-auto w-11/12 py-10">
        <BlogCategory />
      </section>
    </>
  );
}
