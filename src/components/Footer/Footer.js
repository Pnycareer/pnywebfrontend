import Branches from "./Branches";
import CityCourses from "./Citycourses";
import Copyrights from "./Copyrights";
import Image from "next/image";
import logo from '@/assets/logo/Pnylogo.png'

export default function Footer() {
    return (
      <footer className="bg-grey-200 text-black py-10 px-5 md:px-20">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Head Office */}
          <div>
            <Image width={100} height={100} src={logo} alt="PNY Trainings" className="h-14 mb-4" unoptimized={true}/>
            <h3 className="text-lg font-bold">Head Office</h3>
            <p className="text-sm">
              Office # 1, Level # 14, Arfa Software Technology Park, Ferozepur Road, Lahore, Pakistan
            </p>
            <p className="text-sm mt-2">
              Phone: 03041111774 <br />
              Whatsapp: 0309-7779401
            </p>
          </div>
  
          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="hover:underline">FAQs</a></li>
              <li><a href="#" className="hover:underline">Admission</a></li>
              <li><a href="#" className="hover:underline">Gallery</a></li>
              <li><a href="#" className="hover:underline">Terms & Conditions</a></li>
              <li><a href="#" className="hover:underline">Privacy Policy</a></li>
              <li><a href="#" className="hover:underline">Best Institute in Arfa</a></li>
              <li><a href="#" className="hover:underline">Best Institute in Lahore</a></li>
            </ul>
          </div>
  
          {/* Courses Offered */}
          <div>
            <h3 className="text-lg font-bold mb-4">Courses Offered</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="hover:underline">AI With Machine Learning Bootcamp</a></li>
              <li><a href="#" className="hover:underline">Truck Dispatching Bootcamp</a></li>
              <li><a href="#" className="hover:underline">Cloud Computing Bootcamp</a></li>
              <li><a href="#" className="hover:underline">Cyber Security Bootcamp</a></li>
              <li><a href="#" className="hover:underline">Professional Video Editor & VFX Artist</a></li>
            </ul>
          </div>
  
          {/* Language & Short Courses */}
          <div>
            <h3 className="text-lg font-bold mb-4">Language Courses</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="hover:underline">Spoken English Language</a></li>
              <li><a href="#" className="hover:underline">IELTS Preparation Course</a></li>
              <li><a href="#" className="hover:underline">Pearson Test of English (PTE)</a></li>
            </ul>
            </div>
  <div>
            <h3 className="text-lg font-bold mb-4">Short Courses</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="hover:underline">Short courses in Lahore</a></li>
              <li><a href="#" className="hover:underline">Short courses in Rawalpindi</a></li>
              <li><a href="#" className="hover:underline">Short courses in Karachi</a></li>
              <li><a href="#" className="hover:underline">Short courses in Faisalabad</a></li>
              <li><a href="#" className="hover:underline">Short courses in Gujranwala</a></li>
              <li><a href="#" className="hover:underline">Short courses in Multan</a></li>
              <li><a href="#" className="hover:underline">Short courses in Sialkot</a></li>
              <li><a href="#" className="hover:underline">Short courses in Azad-Kashmir</a></li>
            </ul>
          </div>
        </div>
        <Branches/>
        <CityCourses/>
        <Copyrights/>
      </footer>
    );
  }
  