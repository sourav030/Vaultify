import React, { useContext } from 'react';
import Footer from '../component/Footer';
import Bank from '../component/Bank';
import { BankContext } from '../context/Context';
import LoginPage from './LoginPage';
import { Link } from 'react-router-dom';

const HomePage = () => {
  const { login, setLogin, banks } = useContext(BankContext); // ✅ useContext use karo

  return (
    <div style={{ paddingTop: "35px" }} className='flex flex-col h-[100%]'>

      {/* Hero Section */}
      <div
        style={{ paddingTop: "20px" }}
        className=' bg-blue-300 flex flex-col justify-center items-center h-[70vh]'
      >
        <h1 className="text-5xl font-bold mb-4">Welcome to Vaultify</h1>

        <p
          style={{ marginTop: "15px" }}
          className="max-w-2xl text-lg "
        >
          Experience secure and seamless online banking at your fingertips — transfer money instantly, apply for loans effortlessly, track your transactions in real time, and manage your account anytime, anywhere with complete peace of mind.
        </p>

        <a
         href='#open'
         style={{marginTop:"15px"}}
          className=" flex flex-col justify-center items-center h-[45px] w-[200px] bg-yellow-400 text-black font-semibold px-6 py-3 rounded-lg hover:bg-yellow-300 transition cursor-pointer"
        >
          <center>Open Account</center>
        </a>
      </div>

      {/* Why Choose Vaultify Section */}
      <div style={{ marginTop: "10px" }} className="flex flex-col items-center">

        <h1 className=' text-2xl font-semibold'>Why Choose Vaultify</h1>

        <div style={{ paddingTop: "20px" }} className='flex flex-wrap gap-5'>

          <div className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition h-[135px] flex flex-col items-center justify-center cursor-pointer">
            <h3 className="font-semibold text-lg mb-2">🏦 Instant Account Opening</h3>
            <p className="text-gray-600 text-sm">Create your account in minutes with zero paperwork.</p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition h-[135px] flex flex-col items-center justify-center cursor-pointer">
            <h3 className="font-semibold text-lg mb-2">💸 Secure Money Transfers</h3>
            <p className="text-gray-600 text-sm">Send and receive money instantly and securely.</p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition h-[135px] flex flex-col items-center justify-center cursor-pointer">
            <h3 className="font-semibold text-lg mb-2">📊 Easy Loan Applications</h3>
            <p className="text-gray-600 text-sm">Apply for personal and business loans online.</p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition h-[135px] flex flex-col items-center justify-center cursor-pointer">
            <h3 className="font-semibold text-lg mb-2">🔒 Bank-Level Security</h3>
            <p className="text-gray-600 text-sm">Your data is encrypted and 100% safe.</p>
          </div>
        </div>

        {/* Banks List */}
        <div 
        id='open'
         style={{ padding: "35px" }}>
          <h2 className="text-2xl font-bold text-center text-blue-900 mb-6">Open Your Account Today</h2>
          <div style={{ marginTop: "25px" }} className="flex flex-wrap justify-center gap-8">
            {banks.map((bank) => (
              <Bank
                key={bank.bank_id}
                bank_id={bank.bank_id}
                bank_name={bank.bank_name}
                location={bank.location}
                total_money={bank.total_money}
                image_url={bank.image_url}
              />
            ))}
          </div>
        </div>

        <Footer />
      </div>
    </div>
  );
};

export default HomePage;
