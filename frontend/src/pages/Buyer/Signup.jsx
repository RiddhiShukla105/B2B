import React,{useState,useEffect} from "react";
import axios from 'axios'
import {Link} from 'react-router-dom'

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

    const handleSubmit=async(e)=>{
        try{
            e.preventDefault();
            const res=await axios.post(`${import.meta.env.VITE_API_URL}/api/user/create-user`,form)
            console.log(res)
            setForm({name:"",email:"",password:""})
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


    return(
        <>

        <div className="grid grid-cols-2 shadow-2xl my-9 mx-20 rounded">
{/* cyan-600 ,teal-600*/}
        <div className="text-center bg-teal-700 pt-8">
            <form onSubmit={handleSubmit}>
            <h1 className="text-5xl font-black text-center my-12 text-white">Sign-up</h1>
            <input type="text"  name="name" id="" onChange={handleInput}  className="border-2 border-gray-200 w-1/2 p-2 mb-4 bg-gray-200" placeholder="John Doe"/><br/>
            <input type="email" name="email" id="" onChange={handleInput} className="border-2 border-gray-200 w-1/2 p-2 mb-4 bg-gray-200" placeholder="Johndoe@gmail.com"/><br/>
            <input type="password" name="password" id="" onChange={handleInput} className="border-2 border-gray-200 w-1/2 p-2 bg-gray-200" placeholder="Jo@4765768"/><br/>
            <input type="submit" value="Submit" className="bg-white text-teal-700 rounded-2xl px-16 py-2 text-xl my-16 " />
            </form>
        </div>
        <div className="text-center bg-red-400 pt-8">
            <div className="text-white text-4xl font-bold my-12">Bonjour, Customers!</div>
            <div className="text-white text-2xl font-semibold">
            Already have an Account with us?
             <br/><br/>
              Then Login and continue shopping with us! <br />
              <Link to="/login"><input type="submit" value="Login" className="bg-white text-red-400 rounded-2xl px-16 py-2 text-xl my-16" /></Link>
               </div>
        </div>
        </div>

        {/* {Array.isArray(userData) && userData.map((item)=>(
            <div key={item._id}>
                <span>{item.name}</span>
                <span>{item.email}</span>
                <span><button type="submit" onClick={()=>handleUpdate(item)}>Update</button></span>
                <span><button type="submit" onClick={()=>handleDelete(item)}>Delete</button></span>
                <span><button type="submit" onClick={()=>handleblock(item)}>Block</button></span>
                <span><button type="submit" onClick={()=>handleunblock(item)}>UnBlock</button></span>
            </div>
        ))}

        

        {visible && (
            <form  onClick={handleUpdateSubmit}>
                <div>
                <input type="text" name="name" id="" onChange={handleInput} value={form.name}/>
                <button type="submit" >Update</button>
            </div>
            </form>
        )} */}

        </>
    )
}

export default Signup;