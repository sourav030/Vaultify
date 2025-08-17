import React, { useContext, useState } from "react";
import { NavLink } from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa";
import{ BankContext} from '../context/Context'
import { toast } from "react-toastify";
const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const {token,setToken}=useContext(BankContext)

  const LogOutHandler=()=>{
    localStorage.removeItem('token');
    setToken(null);
    toast.success("LogOut SuccessFully");
  }

  const navLinks = [
    { path: "/", label: "Home" },
    { path: "/Deposit-Money", label: "Deposit Money" },
    { path: "/Loan", label: "Loan" },
    { path: "/Transfer-Money", label: "Transfer Money" },
    { path: "/Account", label: "Account" },
  ];

  return (
    <header className="bg-white h-[50px] flex  shadow-md fixed w-full top-0 left-0 z-50">
      <div className="container mx-auto px-6 py-3 flex justify-between items-center">
        {/* Brand */}
        <h2 className="font-extrabold text-xl text-blue-600">Vaultify App</h2>

        {/* Desktop Nav */}
        <nav className="hidden md:flex gap-6">
          {navLinks.map((link) => (
            <NavLink
              key={link.path}
              to={link.path}
              className={({ isActive }) =>
                `font-semibold transition-all duration-300 hover:text-blue-600 relative ${
                  isActive ? "text-blue-600 after:w-full" : "text-gray-700 after:w-0"
                } after:block after:h-[2px] after:bg-blue-600 after:transition-all after:duration-300 after:absolute after:left-0 after:-bottom-1`
              }
            >
              {link.label}
            </NavLink>
          ))}
           <button
           onClick={LogOutHandler}
            className="cursor-pointer font-semibold hover:bg-yellow-400  rounded-sm ">
              LogOut
            </button>
        </nav>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden text-2xl text-gray-700"
        >
          {isOpen ? <FaTimes /> : <FaBars />}
        </button>
      </div>

      {/* Mobile Nav */}
      {isOpen && (
        <nav className="md:hidden bg-white shadow-md px-6 py-4 space-y-3">
          {navLinks.map((link) => (
            <NavLink
              key={link.path}
              to={link.path}
              onClick={() => setIsOpen(false)}
              className={({ isActive }) =>
                `block font-semibold transition-all duration-300 hover:text-blue-600 ${
                  isActive ? "text-blue-600" : "text-gray-700"
                }`
              }
            >
              {link.label}
            </NavLink>
          ))}
         
        </nav>
      )}
    </header>
  );
};

export default Navbar;
