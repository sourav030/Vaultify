import React from "react";
import { NavLink } from "react-router-dom";
import { FaEnvelope, FaPhoneAlt, FaMapMarkerAlt } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className=" shadow-2xl h-full w-screen  text-gray-900 py-10">
      <div className=" h-full container mx-auto px-6 flex justify-around">

        {/* Brand */}
        <div>
          <h2 className="text-2xl font-bold text-white">Vaultify App</h2>
          <p className="text-sm mt-3 text-gray-800 leading-relaxed">
            Your secure way to manage money, loans, and transfers with confidence.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-3">Quick Links</h3>
          <ul className="space-y-2">
            <li>
              <NavLink to="/" className="hover:text-amber-400 transition-colors">Home</NavLink>
            </li>
            <li>
              <NavLink to="/Deposit-Money" className="hover:text-amber-400 transition-colors">Deposit Money</NavLink>
            </li>
            <li>
              <NavLink to="/Loan" className="hover:text-amber-400 transition-colors">Loan</NavLink>
            </li>
            <li>
              <NavLink to="/Transfer-Money" className="hover:text-amber-400 transition-colors">Transfer Money</NavLink>
            </li>
            <li>
              <NavLink to="/Account" className="hover:text-amber-400 transition-colors">Account</NavLink>
            </li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-3">Contact Us</h3>
          <p className="flex items-center gap-2"><FaEnvelope /> support@vaultify.com</p>
          <p className="flex items-center gap-2"><FaPhoneAlt /> +91-1234567890</p>
          <p className="flex items-center gap-2"><FaMapMarkerAlt /> Chandigarh, India</p>
        </div>
      </div>

      {/* Bottom */}
      /
    </footer>
  );
};

export default Footer;
