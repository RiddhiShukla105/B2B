import React,{useState,useEffect} from "react";
import axios from 'axios'
import {Link, useNavigate} from 'react-router-dom'
import Swal from "sweetalert2";

const Signup=()=>{

    const[form,setForm]=useState({
        name:"",
        email:"",
        password:""
    })

    const[userData,setUserdata]=useState([])
    const[visible,setVisible]=useState(false)
    const[selectedUserId,setSelectedUserId]=useState(null)

    useEffect(()=>{
        fetchdata()
    },[])

    const handleInput=(e)=>{
        setForm({...form,[e.target.name]:e.target.value})
    }

    const navigate=useNavigate()

    const handleSubmit=async(e)=>{
        try{
            e.preventDefault();
            const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
            if (!emailRegex.test(form.email)) {
                Swal.fire({ icon: "error", title: "Invalid Email Format" });
                return;
            }

            const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/;
            if (!passwordRegex.test(form.password)) {
                Swal.fire({ icon: "error", title: "Password must be at least 8 characters long and include an uppercase letter, a lowercase letter, a digit, and a special character." });
                return;
            }

            if (!(form.name.length > 2)) {
                Swal.fire({icon:"error",title:"Name should be greater than 2 characters"})
                return;
            }


            const res=await axios.post(`${import.meta.env.VITE_API_URL}/api/user/create-user`,form)
            // console.log(res)
            setForm({name:"",email:"",password:""})
            navigate("/login")
            e.target.reset()
            fetchdata()
        }catch(error){
            console.log(error)
        }
    }

    const fetchdata=async()=>{
        try{
            const res=await axios.get(`${import.meta.env.VITE_API_URL}/api/user/get-user`)
            setUserdata(res.data.user)
        }catch(error){
            console.log(error)
        }
    }

    // const handleUpdate=(user)=>{
    //     try{
    //         setVisible(true)
    //         setSelectedUserId(user._id)
    //         setForm({name:user.name})
    //     }catch(error){
    //         console.log(error)
    //     }

    // }

    // const handleUpdateSubmit=async(e,selectedUserId)=>{
    //     try{
    //         e.preventDefault()
    //         await axios.put(`http://localhost:5000/api/user/update-user/${selectedUserId}`,{name:form.name})
    //         setVisible(false)
    //          fetchdata()
    //     }catch(error){
    //         console.log(error)
    //     }
    // }

    // const handleDelete=async(user)=>{
    //     try{
    //         await axios.delete(`http://localhost:5000/api/user/delete-user/${user._id}`)
    //         fetchdata()
    //     }catch(error){
    //         console.log(error)
    //     }
    // }

    // const handleblock=async(user)=>{
    //     try{
    //         await axios.put(`http://localhost:5000/api/user/block-user/${user._id}`)
    //         console.log("User blocked")

    //     }catch(error){
    //         console.log(error)
    //     }
    // }

    // const handleunblock=async(user)=>{
    //     try{
    //         await axios.put(`http://localhost:5000/api/user/unblock-user/${user._id}`)
    //         console.log("User unblocked")
    //     }catch(error){
    //         console.log(error)
    //     }
    // }


    return (
  <>
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4 py-10">
      <div className="w-full max-w-6xl grid grid-cols-1 md:grid-cols-2 rounded-2xl shadow-2xl overflow-hidden">
        
        {/* LEFT SIDE - SIGNUP */}
        <div className="bg-teal-700 flex flex-col justify-center items-center p-8 md:p-12">
          <form onSubmit={handleSubmit} className="w-full max-w-md">
            
            <h1 className="text-3xl md:text-5xl font-black text-center mb-10 text-white">
              Sign-up
            </h1>

            <input
              type="text"
              name="name"
              onChange={handleInput}
              className="w-full p-3 mb-4 rounded-lg bg-gray-200 focus:outline-none focus:ring-2 focus:ring-white"
              placeholder="John Doe"
            />

            <input
              type="email"
              name="email"
              onChange={handleInput}
              className="w-full p-3 mb-4 rounded-lg bg-gray-200 focus:outline-none focus:ring-2 focus:ring-white"
              placeholder="johndoe@gmail.com"
            />

            <input
              type="password"
              name="password"
              onChange={handleInput}
              className="w-full p-3 mb-6 rounded-lg bg-gray-200 focus:outline-none focus:ring-2 focus:ring-white"
              placeholder="Jo@4765768"
            />

            <button
              type="submit"
              className="w-full bg-white text-teal-700 font-semibold rounded-xl py-3 text-lg hover:bg-gray-100 transition duration-300"
            >
              Submit
            </button>
          </form>
        </div>

        {/* RIGHT SIDE - LOGIN */}
        <div className="bg-red-400 flex flex-col justify-center items-center text-center p-8 md:p-12">
          <h2 className="text-2xl md:text-4xl font-bold text-white mb-6">
            Bonjour, Customers!
          </h2>

          <p className="text-white text-base md:text-xl mb-8">
            Already have an account with us?
            <br />
            Then login and continue shopping!
          </p>

          <Link to="/login">
            <button className="bg-white text-red-400 font-semibold rounded-xl px-10 py-3 text-lg hover:bg-gray-100 transition duration-300">
              Login
            </button>
          </Link>
        </div>
      </div>
    </div>
  </>
);

}

export default Signup;