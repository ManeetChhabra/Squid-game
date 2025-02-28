import React from "react";
import { FaFacebookF, FaTwitter, FaLinkedinIn } from "react-icons/fa";
import { MdEmail, MdPhone, MdLocationOn } from "react-icons/md";

const Footer = () => {
  return (
    <footer className="bg-white py-8 px-4 md:px-20 text-gray-900">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center md:items-start">
        {/* Left Section */}
        <div className="flex flex-col items-center md:items-start mb-6 md:mb-0">
          <div className="bg-orange-500 p-3 rounded-full">
            <img src="/logo.png" alt="Skillbridge Logo" className="w-8 h-8" />
          </div>
          <div className="mt-4 space-y-2 text-center md:text-left">
            <p className="flex items-center gap-2"><MdEmail /> hello@skillbridge.com</p>
            <p className="flex items-center gap-2"><MdPhone /> +91 91813 23 2309</p>
            <p className="flex items-center gap-2"><MdLocationOn /> Somewhere in the World</p>
          </div>
        </div>

        {/* Middle Section */}
        <div className="flex flex-wrap justify-center md:justify-start space-x-8 text-center md:text-left">
          <div>
            <h3 className="font-semibold">Home</h3>
            <ul className="space-y-1 text-gray-600">
              <li>Benefits</li>
              <li>Our Courses</li>
              <li>Our Testimonials</li>
              <li>Our FAQ</li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold">About Us</h3>
            <ul className="space-y-1 text-gray-600">
              <li>Company</li>
              <li>Achievements</li>
              <li>Our Goals</li>
            </ul>
          </div>
        </div>

        {/* Right Section */}
        <div className="flex flex-col items-center md:items-start">
          <h3 className="font-semibold">Social Profiles</h3>
          <div className="flex space-x-3 mt-2">
            <FaFacebookF className="p-2 bg-gray-200 rounded-full w-8 h-8" />
            <FaTwitter className="p-2 bg-gray-200 rounded-full w-8 h-8" />
            <FaLinkedinIn className="p-2 bg-gray-200 rounded-full w-8 h-8" />
          </div>
        </div>
      </div>

      <div className="text-center mt-6 text-gray-600 text-sm">
        © 2023 Skillbridge. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;