
import React from "react";

const AdmissionSection = () => {
  return (
    <div className="grid justify-center lg:p-28 md:p-20 max-sm:p-5 text-black bg-blue-100">
      <div className="lg:text-5xl lg:w-[778px]  max-sm:p- font-bold text-center ">
        Admissions are open for the fresh batch. Let’s grow together!
      </div>
      <div className="text-center lg:p-4 max-sm:mt-2">
        <a href="https://lms.pnytraining.com" target="_blank">
          <button className="bg-[#49B2DF] lg:w-48 lg:h-14 text-white rounded max-sm:w-36 max-sm:h-10 cursor-pointer">
            Enroll Now!
          </button>
        </a>
      </div>
    </div>
  );
};

export default AdmissionSection;
