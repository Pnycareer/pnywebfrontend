import React from "react";
import BranchCard from "./BranchCards";

// Place all your contactus data here (your exact provided object)
import arfa from "../../assets/branches/arfa.png";
import multan from "../../assets/branches/mt.png";
import johartown from "../../assets/branches/jt.png";
import rawalpindi from "../../assets/branches/rp.png";
import iqbaltown from "../../assets/branches/ait.png";
import Shad from "../../assets/branches/shadarac.webp";
import sargodha from "../../assets/branches/sargodha.jpg";
import saudia from "../../assets/branches/saudia.jpg";

export const contactus = [
  {
    id: 1,
    image: arfa,
    title: "Arfa Karim Tower",
    description:
      "Office # 1, Level # 14, Arfa Software Technology Park, Ferozepur Road Lahore, Pakistan",
    phone: "0304-1111774",
    phone1: "0309-7779401",
    Map: "https://maps.app.goo.gl/WoT7KdNiFN7kNJEm9",
    link: "https://www.youtube.com/watch?v=_HulKf9eRew",
  },
  {
    id: 2,
    image: iqbaltown,
    title: "Allama Iqbal Town Branch",
    description: "743 B Kashmir Block Allama Iqbal Town Lahore",
    phone: "0309-7774937",
    Map: "https://maps.app.goo.gl/G6aX8FxukwVuiGYE9",
    link: "https://www.youtube.com/watch?v=ZK1s6QMCRi8",
  },
  {
    id: 3,
    image: johartown,
    title: "Johar Town Branch",
    description:
      "1st Floor 256 / A, Block R2 Near Shaukat Khanam Hospital, next to Standard Chartered, Lahore",
    phone: "0309-7772259",
    Map: "https://maps.app.goo.gl/SSSigyDGw329sF2y8",
    link: "https://www.youtube.com/watch?v=Y8kNFl5RVvU",
  },
  {
    id: 4,
    image: multan,
    title: "Multan Branch",
    description: "237-B, Model Town, Main Boulevard, Multan",
    phone: "0300-8405591",
    Map: "https://maps.app.goo.gl/fkZdwWjPfwk3Z2Ny9",
    link: "https://www.facebook.com/pny.multan/videos/226519397106219",
  },
  {
    id: 5,
    image: rawalpindi,
    title: "Rawalpindi Branch",
    description:
      "Office # 102, Floor #1 Talha Heights Plot # 21-D,6th Road Satellite Town, Rawalpindi",
    phone: "0309-7772260",
    phone1: "0309-7774685",
    Map: "https://maps.app.goo.gl/hdd4wgvG6pcdDjbL9",
    link: "https://www.youtube.com/watch?v=QVo6WNbZ3-o",
  },
  {
    id: 6,
    image: Shad,
    title: "Shahdara Branch",
    description:
      "Office#1, Floor#2, Al-Habib Bank, Phool Mandi, Al Saeed Chowk Saggian, Bypass Lahore-Jaranwala Rd, Lahore, Pakistan",
    phone: "0309-7779409",
    Map: "https://maps.app.goo.gl/dPPxyZfWxfeWPJxb7",
  },
  {
    id: 7,
    image: sargodha,
    title: "Sargodha Branch",
    description:
      "Mawk Tech Space, 2nd Floor Ahsan Cash & Carry, near zafar ullah chowk Sargodha",
    phone: "0309-7778630",
    Map: "https://maps.app.goo.gl/wr5n8yhYPNK3gRAi8",
  },
  {
    id: 8,
    image: saudia,
    title: "Saudi branch",
    description:
      "Office No. 7, 1st Floor, ALJMAZ Building Prince Sultan Bin Abdulaziz Rd, Above Dunkin Donuts Al Olaya, Riyadh 12221",
    phone: "0578-858131",
  },
];

const BranchList = () => {
    return (
      <div className="py-12 bg-gray-50">
        <h2 className="text-center text-2xl font-bold mb-8">
          Find More Branches in Pakistan
        </h2>
        <div className="flex flex-wrap justify-center gap-6 px-4">
          {contactus.map((branch) => (
            <BranchCard key={branch.id} branch={branch} />
          ))}
        </div>
      </div>
    );
  };

export default BranchList;
