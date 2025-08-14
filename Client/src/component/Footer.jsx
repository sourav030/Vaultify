import React from 'react';
import { NavLink } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-gray-200 text-gray-700 py-8">
      <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8">

        {/* Brand */}
        <div>
          <h2 className="text-xl font-bold">Vaultify App</h2>
          <p className="text-sm mt-2">
            Your secure way to manage money, loans, and transfers with confidence.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="font-semibold mb-2">Quick Links</h3>
          <ul className="space-y-1">
            <li><NavLink to="/" className="hover:underline">Home</NavLink></li>
            <li><NavLink to="/Deposit-Money" className="hover:underline">Deposit Money</NavLink></li>
            <li><NavLink to="/Loan" className="hover:underline">Loan</NavLink></li>
            <li><NavLink to="/Transfer-Money" className="hover:underline">Transfer Money</NavLink></li>
            <li><NavLink to="/Account" className="hover:underline">Account</NavLink></li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h3 className="font-semibold mb-2">Contact Us</h3>
          <p>Email: support@vaultify.com</p>
          <p>Phone: +91-1234567890</p>
          <p>Address: Chandigarh, India</p>
        </div>
      </div>

      {/* Bottom */}
      <div className="text-center text-sm mt-8 border-t border-gray-300 pt-4">
        © {new Date().getFullYear()} Vaultify App. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
