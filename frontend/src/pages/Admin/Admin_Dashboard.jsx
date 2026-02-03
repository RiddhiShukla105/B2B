import React from 'react'
import { Link } from 'react-router-dom'

const Admin_Dashboard = () => {
  return (
    <div>
      <Link to="/admin"><div className="text-2xl font-bold shadow-2xl px-8 py-12 mt-10">Add Product</div></Link>
      <Link to="/orderupdate"><div className="text-2xl font-bold shadow-2xl px-8 py-12 mt-10">User Data</div></Link>
      <Link to="/admindashboard"><div className="text-2xl font-bold shadow-2xl px-8 py-12 mt-10">Order Data</div></Link>
      <Link to="/productdata"><div className="text-2xl font-bold shadow-2xl px-8 py-12 mt-10">Product Data</div></Link>
    </div>
  )
}

export default Admin_Dashboard

