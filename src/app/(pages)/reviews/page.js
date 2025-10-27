// app/(wherever)/page.js
import HeaderSection from "@/components/HeaderSection/Headersection";
import SuccessStories from "./SuccessStories";
import VideoReviews from "./VideoReviews";

export default function Page() {
  return (
    <>
      <HeaderSection
        image="https://www.sittechno.org/userfiles/image/success1.jpg"
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
