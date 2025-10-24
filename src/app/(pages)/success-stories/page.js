import HeaderSection from "@/components/HeaderSection/Headersection";
import SuccessStories from "./SuccessStories";

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
    </>
  );
}
