import React from 'react';
import { NavLink } from "react-router-dom";

const Navbar = () => {
  return (
    <div className="">
      <div className="ml-1 flex justify-around">
        <h2 className="font-bold text-lg">Vaultify App</h2>

        <nav className="space-x-4 flex justify-between gap-5">
          <NavLink
            to="/"
            className={({ isActive }) =>
              `font-bold ${isActive ? "text-blue-600" : "text-gray-700"}`
            }
          >
            Home
          </NavLink>

          <NavLink
            to="/Deposit-Money"
            className={({ isActive }) =>
              `font-bold ${isActive ? "text-blue-600" : "text-gray-700"}`
            }
          >
            Deposit Money
          </NavLink>

          <NavLink
            to="/Loan"
            className={({ isActive }) =>
              `font-bold ${isActive ? "text-blue-600" : "text-gray-700"}`
            }
          >
            Loan
          </NavLink>

          <NavLink
            to="/Transfer-Money"
            className={({ isActive }) =>
              `font-bold ${isActive ? "text-blue-600" : "text-gray-700"}`
            }
          >
            Transfer Money
          </NavLink>

          <NavLink
            to="/Account"
            className={({ isActive }) =>
              `font-bold ${isActive ? "text-blue-600" : "text-gray-700"}`
            }
          >
            Account
          </NavLink>
        </nav>
      </div>
    </div>
  );
};

export default Navbar;
