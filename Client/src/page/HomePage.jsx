import React from 'react'
import image from '../assets/image.png'
import Bank from '../component/Bank'
import Footer from '../component/Footer'

const HomePage = () => {
  return (
    <div className='flex flex-col gap-6'>
      <div
        className='flex flex-col items-center justify-center'
        style={{
          backgroundImage: `url(${image})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          height: "70vh"
        }}
      >
        {/* Content inside background */}
        <div className='flex justify-center items-center flex-col'>
          <div>

            <h1 className='font-bold size-5  w-[195px] text-gray-700'>Welcome in Vaultify app</h1>
          </div>
          <div>

            <p className='text-gray-600'>
              Here, you can perform secure transactions from one user account to another and also apply for a loan.
            </p>

          </div>
        </div>
      </div>
     
      {/*  open a account in Bank */}
      <div className=' flex flex-row justify-center border items-center h-10'>
        <h1 className=' font-semibold text-gray-600 size-5 w-55 '> Open Your Account</h1>
      </div>

      <div style={{marginLeft:"20px"}} className='flex  gap-12 flex-wrap pt-2  '>
        <Bank/>
        <Bank/>
        <Bank/>
        <Bank/>
        <Bank/>
        <Bank/>
        <Bank/>
        <Bank/>
        <Bank/>
        <Bank/>
      </div>

      
        <Footer/>
      

    </div>
  )
}

export default HomePage
