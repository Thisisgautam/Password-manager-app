import React from 'react'

const Footer = () => {
  return (
    <div className='bg-black text-white flex flex-col items-center p-2 fixed bottom-0 w-full'>
    <div className="logo font-bold">
            <span className='text-yellow-400 font-bold'>&lt;</span>iPass<span className='text-yellow-400 font-bold'>/&gt;</span></div>
    <div className=' flex gap-2'>
      <span>Created with</span>  <img className='w-6' src="icons/heart.png" alt="" /> <span> by Goutamm</span>
    </div>
    </div>
  )
}

export default Footer
