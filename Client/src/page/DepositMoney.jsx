import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { BankContext } from "../context/Context";

const DepositMoney = () => {
  const { accoutId, token } = useContext(BankContext); // ✅ corrected typo
  const [amount, setAmount] = useState("");

  const MoneyHandler = async () => {
    if (!amount || Number(amount) <= 0) {
      toast.error("Please enter a valid amount!");
      return;
    }

    try {
      const res = await axios.post(
        "http://localhost:5000/acount/api/v1/credit",
        { amount: Number(amount), accoutId },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      console.log(res.data);
      toast.success("💰 Money deposited successfully!");
      setAmount(""); // reset input

    } catch (err) {
      console.error(err.message);
      toast.error("❌ Deposit Money Unsuccessful");
    }
  };


  return (
    <div className="bg-gradient-to-br from-blue-200 to-blue-400 h-screen flex items-center justify-center px-4">
      {/* Card */}
      <div className="bg-white w-full max-w-md rounded-2xl shadow-2xl p-8 flex flex-col gap-6">
        {/* Heading */}
        <h1 className="font-bold text-2xl text-center text-blue-900">
          Deposit Money
        </h1>
        <p className="text-center text-gray-600 text-sm">
          Enter the amount you want to deposit in your account
        </p>

        {/* Input */}
        <div>
          <label className="block text-gray-700 font-medium mb-2">
            Amount (₹)
          </label>
          <input
            type="number"
            min="0"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="w-full h-[45px] border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
            placeholder="Enter amount to deposit"
          />
        </div>

        {/* Button */}
        <button
          onClick={MoneyHandler}
          disabled={!amount || Number(amount) <= 0}
          className={`w-full h-[40px] bg-gradient-to-r from-yellow-400 to-yellow-500 text-black font-semibold py-3 rounded-lg shadow-md hover:from-yellow-300 hover:to-yellow-400 transition ${!amount || Number(amount) <= 0 ? "opacity-50 cursor-not-allowed" : ""}`}
        >
          Deposit Now
        </button>

        {/* Footer Note */}
        <p className="text-center text-xs text-gray-500 mt-2">
          💡 Your deposits are 100% secure with bank-level encryption.
        </p>
      </div>
    </div>
  );
};

export default DepositMoney;
