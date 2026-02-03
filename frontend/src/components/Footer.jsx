import React from "react";
import { AiFillInstagram, AiFillFacebook } from "react-icons/ai";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="relative bg-[#0b0b0f] text-gray-300 mt-16 font-serif">

      {/* Subtle top divider */}
      <div className="h-[1px] w-full bg-gradient-to-r from-transparent via-yellow-500/40 to-transparent"></div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-6 sm:px-10 py-16 text-center">

        {/* Brand */}
        <h3 className="text-3xl sm:text-4xl font-semibold tracking-wide text-white">
          ModaStitch
        </h3>

        <p className="mt-5 max-w-2xl mx-auto text-gray-400 leading-relaxed">
          Contemporary fashion crafted for comfort, confidence, and everyday elegance.
          Enter 2025 with refined style and timeless design.
           
        </p>

        {/* Contact */}
        <div className="mt-8 space-y-2 text-sm">
          <p>
            <span className="text-gray-500">Email:</span>{" "}
            <span className="text-gray-300">info@modastitch.com</span>
          </p>
          <p>
            <span className="text-gray-500">Phone:</span>{" "}
            <span className="text-gray-300">+1 971 476 8001</span>
          </p>
          <p>
            <span className="text-gray-500">Address:</span>{" "}
            <span className="text-gray-300">
              16434 Harding Rd, Oregon City
            </span>
          </p>
        </div>

        {/* Social */}
        <div className="mt-6 flex justify-center gap-8 text-gray-400">
          <Link
            to="https://www.instagram.com/modastitch_official/"
            className="hover:text-white transition"
          >
            <AiFillInstagram size={24} />
          </Link>
          <Link
            to="https://www.facebook.com/profile.php?id=61578685778047"
            className="hover:text-white transition"
          >
            <AiFillFacebook size={24} />
          </Link>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/10 py-5 text-center text-xs text-gray-500 font-serif">
        © 2025 ModaStitch. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
