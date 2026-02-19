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
  // const from = location.state?.from || "/";

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
    // window.location.reload();

    window.dispatchEvent(new Event("auth-change"));

    toast.success("Login successful",{autoClose:2000});

    // navigate(from, { replace: true });
    navigate("/")
  } catch (err) {
    toast.error(err.response?.data?.message || "Login failed");
    console.error("Login error:", err);
  }
};


 return (
  <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4 py-10">
    <div className="w-full max-w-6xl grid grid-cols-1 md:grid-cols-2 rounded-2xl shadow-2xl overflow-hidden">

      {/* LEFT SIDE */}
      <div className="bg-red-400 flex flex-col justify-center items-center text-center p-8 md:p-12">
        <h2 className="text-2xl md:text-4xl font-bold text-white mb-6">
          Bonjour, Customers!
        </h2>

        <p className="text-white text-base md:text-xl mb-8">
          Create an account with us!
          <br />
          Then login and continue shopping!
        </p>

        <Link to="/sign">
          <button className="bg-white text-red-400 font-semibold rounded-xl px-10 py-3 text-lg hover:bg-gray-100 transition duration-300">
            Sign-up
          </button>
        </Link>
      </div>

      {/* RIGHT SIDE */}
      <div className="bg-teal-700 flex flex-col justify-center items-center p-8 md:p-12">
        <form onSubmit={handleSubmit} className="w-full max-w-md">
          <h1 className="text-3xl md:text-5xl font-black text-center mb-10 text-white">
            Sign-In
          </h1>

          <input
            type="email"
            name="email"
            onChange={handleInput}
            value={formdata.email}
            className="w-full p-3 mb-6 rounded-lg bg-gray-200 focus:outline-none focus:ring-2 focus:ring-white"
            placeholder="johndoe@gmail.com"
            required
          />

          <input
            type="password"
            name="password"
            onChange={handleInput}
            value={formdata.password}
            className="w-full p-3 mb-8 rounded-lg bg-gray-200 focus:outline-none focus:ring-2 focus:ring-white"
            placeholder="**********"
            required
          />

          <button
            type="submit"
            className="w-full bg-white text-teal-700 font-semibold rounded-xl py-3 text-lg hover:bg-gray-100 transition duration-300"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  </div>
);

};

export default Login;
