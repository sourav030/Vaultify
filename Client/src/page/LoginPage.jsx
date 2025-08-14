import React, { useState } from 'react'

const LoginPage = () => {
  const [login, setLogin] = useState(true); // ✅ square brackets

  return (
    <div className="flex items-center justify-center h-screen bg-blue-100">
      <div className="border border-gray-700 min-h-[300px] w-[25%] shadow-2xl flex flex-col gap-3 items-center py-6">

        <div className="mt-8">
          {login ? (
            <p style={{ paddingTop: "10px" }} className='className="text-gray-700'>Login your account</p>
          ) : (
            <p style={{ paddingTop: "10px" }} className='className="text-gray-700'>Create your account</p>
          )}
        </div>

        {!login ? <input type="text" className="border border-gray-800 h-[45px] w-[300px] p-2" placeholder="Enter your name" /> : ""}
        <input type="text" className="border border-gray-800 h-[45px] w-[300px] p-2" placeholder="Enter your email" />
        {!login ? <input type="number" className="border border-gray-800 h-[45px] w-[300px] p-2" placeholder="Enter your Phone Number" /> : ""}
        <input type="password" className="border border-gray-800 h-[45px] w-[300px] p-2" placeholder="Enter your Password" />

        <div>
          {login ? (
            <button className=" bg-blue-700 border hover:bg-blue-100 w-[300px] h-[45px] cursor-pointer">Login</button>
          ) : (
            <button className=" bg-blue-700 border hover:bg-blue-100 w-[300px] h-[45px] cursor-pointer">Signup</button>
          )}
        </div>
        <div>
          {
            login ? <p className='text-blue-400 cursor-pointer' onClick={() => setLogin(!login)}>create your account</p> :
              <p className='text-blue-400 cursor-pointer' onClick={() => setLogin(!login)}>Login into account</p>
          }
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
