import React from "react";
import Link from "next/link";
import { FaTwitter } from "react-icons/fa";
import { FaFacebook } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa6";
import { FaYoutube } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import Image from "next/image";

const Copyrights = () => {
  return (
    <>
      <div className="flex flex-col items-center justify-center gap-4 p-3 bg-gray-300 text-black">
        <div className="text-center">
          Copyright © 2025 - All rights reserved by Next cms
        </div>
        <div className="flex space-x-4">
          {/* Icons with Links */}
          <Link href="https://twitter.com/PnyTrainings" target="_blank">
            <FaTwitter className="text-xl hover:text-blue-500" />
          </Link>
          <Link href="https://www.facebook.com/PNY.Trainings" target="_blank">
            <FaFacebook className="text-xl hover:text-blue-500" />
          </Link>
          <Link
            href="https://pk.linkedin.com/company/pny-trainings"
            target="_blank"
          >
            <FaLinkedin className="text-xl hover:text-blue-700" />
          </Link>
          <Link
            href="https://www.youtube.com/channel/UCdkE8Zm_dNclx3B7s-t6pBQ"
            target="_blank"
          >
            <FaYoutube className="text-xl hover:text-red-600" />
          </Link>
          <Link href="https://www.instagram.com/pny.trainings/" target="_blank">
            <FaInstagram className="text-xl hover:text-pink-600" />
          </Link>
          <Link href="https://www.dmca.com/Protection/Status.aspx?ID=7c917940-1e0d-4855-93f4-76d5632f1b81&refurl=https://www.pnytrainings.com/">
            <Image
              className=" cursor-pointer h-10"
              width={100}
              height={100}
              src="https://www.locklizard.com/wp-content/uploads/2023/04/dmca-protected.png"
              alt=""
              unoptimized={true}
            />
          </Link>
        </div>
      </div>
    </>
  );
};

export default Copyrights;
