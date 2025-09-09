import React from "react";
import Contactus from "./Contactus";
import Metadata from "@/components/Meta/Metadata";

const page = () => {
  return (
    <>
      <Metadata
        title="Contact PNY Trainings – 24/7 Online Support Available"
        description="contact PNY Trainings for 24/7 online support. Our team in Lahore, Multan, Rawalpindi, Sargodha, and Riyadh is ready to assist you via phone, WhatsApp, or in person."
        canonicalUrl="https://www.pnytrainings.com/contact-us"
      />
      <Contactus />
    </>
  );
};

export default page;
