import React from 'react'

const Navbar = () => {
  return (
    <div className='bg-black'>
      <nav className='flex md:my-input justify-between p-3 bg-black text-white'>
        <div className="logo font-bold">
          <span className='text-yellow-400 font-bold'>&lt;</span>iPass<span className='text-yellow-400 font-bold'>/&gt;</span>
        </div>

        <div className="git  text-white">
          <button className='flex items-center justify-between rounded-full bg-yellow-800'>
            <img className='invert w-10 p-1' src="icons/github.svg" alt="" />
            <span className='p-1 font-semibold'><a href="https://github.com/Thisisgautam/Password-manager-app" target='_blank'>Github</a></span>
          </button>
        </div>
      </nav>
    </div>
  )
}

export default Navbar
