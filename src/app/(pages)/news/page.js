import React from "react";
import News from "./News";
import Metadata from "@/components/Meta/Metadata";

const page = () => {
  return (
    <div>
      <Metadata
        title="Newsroom – Updates & Announcements from PNY Trainings"
        description="Stay updated with the latest news, events, and announcements from PNY Trainings. Visit our Newsroom for timely updates about our programs and community."
        canonicalUrl="https://www.pnytrainings.com/news"
      />
      <News />
    </div>
  );
};

export default page;
