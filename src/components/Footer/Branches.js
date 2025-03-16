'use client'
import React from "react";
import { useRouter } from "next/navigation";

const Branches = () => {
    const navigate = useRouter()
  const redirectToCity = (cityName) => {
    navigate.push(`/city/${cityName}`);
  };
  return (
    <>
      {/* Our Branches--------------------------------------------------------------------------------------------- */}
      <div className=" text-center  text-sm md:text-xl font-semibold p-2 mb-4 text-black mt-10">
        Our Branches    
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 p-10 bg-gray-200 text-black">
        <div>
          {/* <Image src={arfatower} alt="Arfa Tower" className="mb-2" /> */}
          <h3 className="text-black font-bold text-lg">
            Arfa Tower (Head Office)
          </h3>
          <p>
            Office 1, Level #14, Arfa Software Technology Park, Ferozepur Road,
            Lahore
          </p>
        </div>

        <div>
          {/* <Image src={iqbaltown} alt="Iqbal Town" className="mb-2" /> */}
          <h3 className="text-black font-bold text-lg">Iqbal Town</h3>
          <p>743 B Kashmir Block Allama Iqbal Town, Lahore</p>
        </div>

        <div>
          {/* <Image src={johartown} alt="Johar Town" className="mb-2" /> */}
          <h3 className="text-black font-bold text-lg">Johar Town</h3>
          <p>
            1st Floor 256 / A, Block R2 Near Shaukat Khanam Hospital, next to
            Standard Chartered, Lahore
          </p>
        </div>

        <div>
          {/* <Image
            className="rounded-full mb-2"
            src={shad}
            alt="Shahdara"
            width={60}
          /> */}
          <h3 className="text-black font-bold text-lg">Shahdara Branch</h3>
          <p>
            Office#1, Floor#2, Al-Habib Bank, Phool Mandi, Al Saeed Chowk
            Saggian, Bypass Lahore-Jaranwala Rd, Lahore, Pakistan
          </p>
        </div>

        <div>
          {/* <Image src={rawal} alt="Rawalpindi" className="mb-2" /> */}
          <h3 className="text-black font-bold text-lg">Rawalpindi</h3>
          <p>
            Office # 102, Floor #1 Talha Heights Plot # 21-D, 6th Road Satellite
            Town, Rawalpindi
          </p>
        </div>

        <div>
          {/* <Image src={multan} alt="Multan" className="mb-2" /> */}
          <h3 className="text-black font-bold text-lg">Multan</h3>
          <p>237-B, Model Town, Main Boulevard, Multan</p>
        </div>

        <div>
          {/* <Image
            className="rounded-full mb-2"
            src={sgdf}
            alt="Rawalpindi"
            width={60}
          /> */}
          <h3 className="text-black font-bold text-lg">Sargodha Branch</h3>
          <p>
            Mawk Tech Space, 2nd Floor Ahsan Cash & Carry, near zafar
            ullah chowk Sargodha
          </p>
        </div>
        <div>
          {/* <Image
            className="rounded-full mb-2"
            src={saudf}
            alt="Rawalpindi"
            width={60}
          /> */}
          <h3 className="text-black font-bold text-lg">Saudi Arabia</h3>
          <p>
            Office No. 7, 1st Floor, ALJMAZ Building Prince Sultan Bin Abdulaziz
            Rd, Above Dunkin Donuts Al Olaya, Riyadh 12221
          </p>
        </div>
      </div>
    
    </>
  );
};

export default Branches;
