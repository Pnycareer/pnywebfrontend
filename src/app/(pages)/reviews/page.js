// app/(wherever)/page.js
import HeaderSection from "@/components/HeaderSection/Headersection";
import SuccessStories from "./SuccessStories";
import VideoReviews from "./VideoReviews";

export default function Page() {
  return (
    <>
      <HeaderSection
        pagetitle="Student Reviews & Success Stories"
        shortdescription="Real voices, real journeys — see how students from different courses like Web Development, Graphic Design, Digital Marketing, and more transformed their skills into real-world success with PNY Trainings. Authentic feedback, honest experiences, and inspiring growth."
        fullScreen={false}
      />

      <section className="mx-auto w-11/12 py-10">
        <SuccessStories />
      </section>

      <section className="mx-auto w-11/12 pb-16">
        <VideoReviews />
      </section>
    </>
  );
}
