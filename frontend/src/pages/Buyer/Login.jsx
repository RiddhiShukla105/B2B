// import React,{useState} from 'react'
// import {Link, useNavigate} from 'react-router-dom'
// import axios from 'axios'

// const Login = () => {

//   const[formdata,setFormdata]=useState({
//     email:"",
//     password:""
//   })

//   const navigate=useNavigate()

//   const handleInput=(e)=>{
//     setFormdata({...formdata,[e.target.value]:e.target.name})
//   }

//   const handleSubmit=(e)=>{
//     e.preventDefault();
//     axios.post(`${import.meta.env.VITE_API_URL}/api/user/login-user`,formdata)
//     navigate("/")
//   }

//   return (
//     <>
//       <div className='grid grid-cols-2 shadow-2xl my-9 mx-20 rounded'>
//       <div className="text-center bg-red-400 pt-8">
//             <div className="text-white text-4xl font-bold my-12">Bonjour, Customers!</div>
//             <div className="text-white text-2xl font-semibold">
//             Create an account with us!
//              <br/><br/>
//               Then Login and continue shopping with us! <br />
//               <Link to="/sign"><input type="submit" value="Sign-up" className="bg-white text-red-400 rounded-2xl px-16 py-2 text-xl my-16" /></Link>
//                </div>
//         </div>
//          <div className="text-center bg-teal-700 pt-8">
//             <form onSubmit={handleSubmit}>
//             <h1 className="text-5xl font-black text-center my-12 text-white">Sign-In</h1>
//             <input type="email"  name="email" id="" onChange={handleInput}  className="border-2 border-gray-200 w-1/2 p-2 mb-8 bg-gray-200" placeholder="Johndoe@gmail.com"/><br/>
//             <input type="password" name="password" id="" onChange={handleInput} className="border-2 border-gray-200 w-1/2 p-2 mb-4 bg-gray-200" placeholder="**********"/><br/>
//             <input type="submit" value="Submit" className="bg-white text-teal-700 rounded-2xl px-16 py-2 text-xl my-16 " />
//             </form>
//         </div>
//       </div>
//     </>
//   )
// }

// export default Login




import React, { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

const Login = () => {
  const [formdata, setFormdata] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();
  const location = useLocation();

  // redirect back to previous page
  const from = location.state?.from || "/";

  const handleInput = (e) => {
    const { name, value } = e.target;
    setFormdata((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    const res = await axios.post(
      `${import.meta.env.VITE_API_URL}/api/user/login-user`,
      formdata
    );

    localStorage.setItem("token", res.data.token);
    localStorage.setItem("role", res.data.role); 
    window.location.reload();

    window.dispatchEvent(new Event("auth-change"));

    toast.success("Login successful");

    navigate(from, { replace: true });
  } catch (err) {
    toast.error(err.response?.data?.message || "Login failed");
    console.error("Login error:", err);
  }
};


  return (
    <div className="grid grid-cols-2 shadow-2xl my-9 mx-20 rounded">
      {/* LEFT */}
      <div className="text-center bg-red-400 pt-8">
        <div className="text-white text-4xl font-bold my-12">
          Bonjour, Customers!
        </div>
        <div className="text-white text-2xl font-semibold">
          Create an account with us!
          <br />
          <br />
          Then Login and continue shopping with us!
          <br />
          <Link to="/sign">
            <input
              type="button"
              value="Sign-up"
              className="bg-white text-red-400 rounded-2xl px-16 py-2 text-xl my-16 cursor-pointer"
            />
          </Link>
        </div>
      </div>

      {/* RIGHT */}
      <div className="text-center bg-teal-700 pt-8">
        <form onSubmit={handleSubmit}>
          <h1 className="text-5xl font-black my-12 text-white">
            Sign-In
          </h1>

          <input
            type="email"
            name="email"
            onChange={handleInput}
            value={formdata.email}
            className="border-2 border-gray-200 w-1/2 p-2 mb-8 bg-gray-200"
            placeholder="Johndoe@gmail.com"
            required
          />
          <br />

          <input
            type="password"
            name="password"
            onChange={handleInput}
            value={formdata.password}
            className="border-2 border-gray-200 w-1/2 p-2 mb-4 bg-gray-200"
            placeholder="**********"
            required
          />
          <br />

          <input
            type="submit"
            value="Submit"
            className="bg-white text-teal-700 rounded-2xl px-16 py-2 text-xl my-16 cursor-pointer"
          />
        </form>
      </div>
    </div>
  );
};

export default Login;
