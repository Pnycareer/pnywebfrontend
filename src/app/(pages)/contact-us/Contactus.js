"use client";
import React, { useState } from "react";
import contact from "@/assets/Contact/contact.webp";
import HeaderSection from "@/components/HeaderSection/Headersection";
import CourseSelect from "@/components/Contact/Courseselect";
import BranchList from "@/components/BranchCards/BranchData";
import Image from "next/image";

const Contactus = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    course: "",
    message: "",
  });

  const [responseMsg, setResponseMsg] = useState("");

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/v1/contact`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        }
      );

      const data = await res.json();
      if (data.success) {
        setResponseMsg("Your message has been sent successfully!");
        setFormData({
          name: "",
          email: "",
          phone: "",
          course: "",
          message: "",
        });
      } else {
        setResponseMsg("Something went wrong!");
      }
    } catch (error) {
      console.error("Submit error:", error);
      setResponseMsg("Failed to connect to the server.");
    }
  };

  return (
    <>
      <HeaderSection
        pagetitle="Contact Us"
        shortdescription="Our Team is always ready to help"
      />
      <div className="w-full mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 items-start p-6">
        {/* Left Side Image */}
        <div className="hidden md:block">
          <Image
            width={500}
            height={500}
            src={contact}
            alt="Contact"
            className="w-full rounded shadow-lg"
          />
        </div>

        {/* Right Side Form */}
        <form onSubmit={handleSubmit} className="space-y-4 w-full">
          <input
            type="text"
            name="name"
            placeholder="Your name"
            className="w-full p-3 border rounded"
            value={formData.name}
            onChange={handleChange}
            required
          />
          <input
            type="email"
            name="email"
            placeholder="you@company.com"
            className="w-full p-3 border rounded"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="phone"
            placeholder="+92 303 4243782"
            className="w-full p-3 border rounded"
            value={formData.phone}
            onChange={handleChange}
            required
          />
          <CourseSelect
            selected={formData.course}
            setSelected={(val) => setFormData({ ...formData, course: val })}
          />
          <textarea
            name="message"
            placeholder="Tell us a little about the Course..."
            className="w-full p-3 border rounded"
            rows="5"
            value={formData.message}
            onChange={handleChange}
            required
          ></textarea>

          <button
            type="submit"
            className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
          >
            Submit
          </button>

          {responseMsg && <p className="text-green-600">{responseMsg}</p>}
        </form>
      </div>
      <BranchList />
    </>
  );
};

export default Contactus;
