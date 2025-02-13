import React, { useEffect, useState } from 'react'
import { useRef } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import { stringify, v4 as uuidv4 } from 'uuid';




const Input = () => {
  //for selecting eye element
  const eye = useRef()
  //for selecting password element
  const pass = useRef()
  //state for password values
  const [form, setform] = useState({ site: "", password: "", username: "" })
  //array for whole databse
  const [passwordArray, setpasswordArray] = useState([])
  //retaining after rerender
  useEffect(() => {
    let passwords = localStorage.getItem("passwords");
    if (passwords) {
      setpasswordArray(JSON.parse(passwords));
    }
  }, [])

  const showPassword = () => {
    pass.current.type = "text"
    if (eye.current.src.includes("icons/eyecross.png")) {
      eye.current.src = "icons/eye.png"
      pass.current.type = "password"
    }
    else {
      eye.current.src = "icons/eyecross.png"
      pass.current.type = "text"
    }
  }
  //To handle input changes
  const handlechange = (e) => {
    setform({ ...form, [e.target.name]: e.target.value })
  }

  //To save the Password
  const savePassword = () => {
    if(form.site.length >3 && form.username.length >3 &&form.password.length >3){
    toast('🦄 Saved!!!', {
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });
    setpasswordArray([...passwordArray,  {...form, id : uuidv4() }])
    localStorage.setItem("passwords", JSON.stringify([...passwordArray,  {...form, id : uuidv4() }]))
    console.log([...passwordArray, form])
    setform({ site: "", password: "", username: "" })}
    else{
      toast("Error: Password Not saved")
    }
  }
  //For delete
  const deletePassword = (id) => {
    
    let c = confirm("Do you really want to delete this")
    if(c){
      toast('🦄 Deleted!!!!', {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    setpasswordArray(passwordArray.filter(i=>i.id!=id))
    localStorage.setItem("passwords", JSON.stringify(passwordArray.filter(i=>i.id!==id)))
  }}
  //for edit
  const editPassword = (id)=>{
   setform(passwordArray.filter(item=>item.id === id)[0])
   setpasswordArray(passwordArray.filter(i=>i.id!=id))

  }
  // For copying the text
  const copyText = (text) => {
    toast('🦄 Copied to Clipboard', {
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });
    navigator.clipboard.writeText(text)
  }



  return (<>
    <ToastContainer
      position="top-right"
      autoClose={2000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick={false}
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      theme="dark"
    />
    <div className=''>
    <div className="absolute top-0 z-[-2] h-screen w-screen bg-[#000000] bg-[radial-gradient(#ffffff33_1px,#00091d_1px)] bg-[size:20px_20px]"></div>
      <div className='rounded-xl bg-slate-50 max-w-4xl p-1 m-3  md:my-input'>
        <h1 className=' text-center font-bold text-4xl'><span className='text-yellow-400 font-bold'>&lt;</span>iPass<span className='text-yellow-400 font-bold'>/&gt;</span></h1>
        <p className=' font-semibold text-center'>Your own Password Manager</p>
        <div className='flex flex-col items-center pt-2 gap-4'>
          <input onChange={handlechange} value={form.site} placeholder='Enter the URL' className='border px-2 rounded-full w-full  border-yellow-300' type="text" name="site" id="" />
          <div className="flex flex-col md:flex-row gap-4 w-full justify-between">
            <input onChange={handlechange} value={form.username} placeholder='Enter Username' className='border w-full rounded-full px-2 border-yellow-300' type="text" name="username" id="" />
            <div className='relative '>
              <input ref={pass} onChange={handlechange} value={form.password} placeholder='Enter Password' className='border w-full rounded-full px-2 border-yellow-300' type="password" name="password" id="" />
              <img ref={eye} onClick={showPassword} className='absolute top-1 right-1 w-5' src="/icons/eye.png" alt="" />
            </div>
          </div>
          <button onClick={savePassword} className='flex justify-center items-center gap-2 bg-yellow-400 hover:bg-yellow-300 rounded-full px-8 py-2 w-fit border border-yellow-900'>
            <lord-icon
              src="https://cdn.lordicon.com/jgnvfzqg.json"
              trigger="hover" >
            </lord-icon>
            Save</button>
        </div>
          <h2 className='font-semibold text-lg py-2'>Your Passwords</h2>
        <div className="dis-passwords overflow-x-auto">
          {passwordArray.length === 0 && <div>No Password to Display</div>}
          {passwordArray.length != 0 && <table class="table-auto rounded-md max-w-[80%] overflow-hidden ">
            <thead className='bg-yellow-700 text-white'>
              <tr>
                <th>Site</th>
                <th>Username</th>
                <th>Password</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody className='bg-yellow-100'>
              {passwordArray.map((items, index) => {
                return <tr key={index}>
                  <td className='text-center w-32 border border-white py-2'>
                    <div className='flex justify-center items-center'> <a href="{items.site}" target='_blank'>{items.site}</a>
                      <div className='lordiconcopy size-7 cursor-pointer' onClick={() => { copyText(items.site) }}>
                        <lord-icon
                          style={{ "width": "25px", "height": "25px", "paddingTop": "3px", "paddingLeft": "3px" }}
                          src="https://cdn.lordicon.com/iykgtsbt.json"
                          trigger="hover" >
                        </lord-icon>
                      </div>
                    </div>
                  </td>
                  <td className='text-center md:w-32 border border-white py-2'>
                    <div className="flex justify-center items-center">
                    {items.username}
                      <div className='lordiconcopy size-7 cursor-pointer' onClick={() => { copyText(items.username) }}>
                        <lord-icon
                          style={{ "width": "25px", "height": "25px", "paddingTop": "3px", "paddingLeft": "3px" }}
                          src="https://cdn.lordicon.com/iykgtsbt.json"
                          trigger="hover" >
                        </lord-icon>
                      </div></div></td>
                  <td className='text-center w-32 border border-white py-2'>
                    <div className="flex justify-center items-center">{'*'.repeat(items.password.length)}
                      <div className='lordiconcopy size-7 cursor-pointer' onClick={() => { copyText(items.password) }}>
                        <lord-icon
                          style={{ "width": "25px", "height": "25px", "paddingTop": "3px", "paddingLeft": "3px" }}
                          src="https://cdn.lordicon.com/iykgtsbt.json"
                          trigger="hover" >
                        </lord-icon>
                      </div></div>
                  </td>
                  <td className='justify-center py-2 border border-white text-center'>
                    <span className='cursor-pointer mx-1' onClick={() => { editPassword(items.id) }}>
                      <lord-icon
                        src="https://cdn.lordicon.com/gwlusjdu.json"
                        trigger="hover"
                        style={{ "width": "25px", "height": "25px" }}>
                      </lord-icon>
                    </span>
                    <span className='cursor-pointer mx-1' onClick={() => { deletePassword(items.id) }}>
                      <lord-icon
                        src="https://cdn.lordicon.com/skkahier.json"
                        trigger="hover"
                        style={{ "width": "25px", "height": "25px" }}>
                      </lord-icon>  </span>
                  </td>
                </tr>
              })}
            </tbody>
          </table>}

        </div>
      </div>
    </div>
  </>
  )
}

export default Input
