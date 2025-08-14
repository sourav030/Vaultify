import React from 'react'
import Sbi from '../assets/Sbi.png'
const Bank = () => {
  return (
    <div className='w-[250px] h-[260px] flex flex-col border shadow-xl rounded-xl'>
      <div>
        <img className='' src={Sbi} alt="" />
      </div>
      <div className='flex justify-around'>
        <h2>Sbi</h2>
        <button 
        className='border border-gray-700 rounded-4xl bg-blue-600 w-[140px] h-[30px] cursor-pointer hover:bg-amber-100 '>
        Open Account
        </button>
      </div>
    </div>
  )
}

export default Bank
