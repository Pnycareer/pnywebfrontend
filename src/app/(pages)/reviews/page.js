// app/(wherever)/page.js
import HeaderSection from "@/components/HeaderSection/Headersection";
import SuccessStories from "./SuccessStories";
import VideoReviews from "./VideoReviews";

export const metadata = {
  title: "PNY Trainings Reviews & Student Success Stories",
  description:
    "See student reviews and inspiring success stories from PNY Trainings. Learn how our hands-on courses in Digital Marketing, Web Development, and more transformed careers.",
  alternates: {
    canonical: "https://www.pnytrainings.com/reviews", // <-- add your canonical URL here
  },
};

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
