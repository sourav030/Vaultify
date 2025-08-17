import React, { useContext, useEffect, useState } from 'react';
import Sbi from '../assets/Sbi.png';
import { BankContext } from '../context/Context';
import axios from 'axios';
import { toast } from "react-toastify";

const Bank = ({ bank_id, bank_name, image_url }) => {
  const { token,accoutId,setAccountId } = useContext(BankContext);
  const [balance, setBalance] = useState(500);
  const [account_type, setAccount] = useState("savings");

  const OpenAccount = async (bank_id) => {
    try {
      const res = await axios.post(
        "http://localhost:5000/acount/api/v1/createAccount",
        { bank_id, balance, account_type },
        {
          headers: {
            Authorization: `Bearer ${token}`, // ✅ token header me bheja
            "Content-Type": "application/json",
          },
        }
      );
      console.log("Account Created:", res.data);
      setAccountId(res.data.insertId)
      toast.success("🎉 Account created successfully!");
    } catch (err) {
      toast.error("❌ Failed to create account");
      console.error("Error creating account:", err);
    }
  };

  useEffect(()=>{
    console.log(accoutId)
  },[accoutId])

  return (
    <div
      className="w-[250px] h-[260px] flex flex-col border border-gray-200 
                 shadow-lg rounded-2xl p-4 
                 bg-white/60 backdrop-blur-md 
                 hover:shadow-2xl hover:scale-105 transition-all duration-300"
    >
      {/* Bank Logo */}
      <div className="flex-1 flex items-center justify-center">
        <img
          className="w-[90px] h-auto object-contain drop-shadow-md"
          src={image_url}
          alt="SBI Logo"
        />
      </div>

      {/* Bank Name & Button */}
      <div className="flex flex-col items-center mt-4 gap-3">
        <h2 className="text-xl font-bold tracking-wide text-gray-800">{bank_name}</h2>
        <button
          onClick={() => OpenAccount(bank_id)} // ✅ button click se call
          style={{ marginBottom: "15px" }}
          className="bg-gradient-to-r from-blue-600 to-indigo-500 text-white 
                     px-5 py-2 rounded-full shadow-md w-[150px] h-[50px]
                     hover:from-amber-400 hover:to-orange-500 hover:text-black 
                     transition-all duration-300 cursor-pointer"
        >
          Open Account
        </button>
      </div>
    </div>
  );
};

export default Bank;
