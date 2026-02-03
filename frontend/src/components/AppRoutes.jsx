import React, { Component } from 'react'
import Login from '../pages/Buyer/Login'
import Dashboard from '../components/Dashboard'
import Footer from '../components/Footer'
import Tshirt from '../pages/Buyer/Tshirt'
import Shirt from '../pages/Buyer/Shirt'
import Admin from '../pages/Admin/Admin'
import ProductData from '../pages/Admin/ProductData'
import Item from '../pages/Buyer/Item'
import Signup from '../pages/Buyer/Signup'
import Order from '../pages/Buyer/Order'
import Cart from '../pages/Buyer/Cart'
import ProtectedRoute from './ProtectedRoutes'
import OrderData from '../pages/Admin/OrderData'
import OrderUpdate from '../pages/Admin/OrderUpdate'
import Wishlist from '../pages/Buyer/Wishlist'
import Admin_Dashboard from '../pages/Admin/Admin_Dashboard'


const AppRoutes=[
    {
        path:'/', 
        Component:()=>(
            <ProtectedRoute publicRoute><Dashboard/></ProtectedRoute>
        ),
        name:"Home"
    },
    {
        path:"/tshirt",
        Component:()=>(
           <ProtectedRoute publicRoute><Tshirt/></ProtectedRoute> 
        ),
        name:"T-shirt"
    },
    {
        path:"/shirt",
        Component:()=>(
           <ProtectedRoute publicRoute> <Shirt/></ProtectedRoute>
        ),
        name:"Shirt"
    },
    {
        path:"/cart",
        Component:()=>(
           <ProtectedRoute publicRoute><Cart/></ProtectedRoute> 
        )
    },
    {
        path:"/tshirt/:id",
        Component:()=>(
           <ProtectedRoute publicRoute><Item/></ProtectedRoute> 
        )
    },
    {
        path:"/sign",
        Component:()=>(
           <ProtectedRoute publicRoute><Signup/></ProtectedRoute> 
        )
    },
    {
        path:"/login",
        Component:()=>(
            <ProtectedRoute publicRoute><Login/></ProtectedRoute>
        )
    },
    {
        path:"/order",
        Component:()=>(
           <ProtectedRoute publicRoute><Order/></ProtectedRoute> 
        ),
    },
    {
        path:"/productdata",
        Component:()=>(
            <ProtectedRoute roleRequired="admin"><ProductData/></ProtectedRoute>
        )
    },
    {
        path:"/admin",
        Component:()=>(
            <ProtectedRoute roleRequired="admin"><Admin/></ProtectedRoute>
        )
    },
    {
        path:"/orderdata",
        Component:()=>(
            <ProtectedRoute publicRoute><OrderData/></ProtectedRoute>
        ),
        name:"Order"
    },
    {
        path:"/orderupdate",
        Component:()=>(
            <ProtectedRoute roleRequired="admin"><OrderUpdate/></ProtectedRoute>
        )
    },
    {
        path:"/wishlist",
        Component:()=>(
            <ProtectedRoute publicRoute><Wishlist/></ProtectedRoute>
        )
    },
    {
        path:"/admindashboard",
        Component:()=>(
            <ProtectedRoute publicRoute><Admin_Dashboard/></ProtectedRoute>
        )
    }
    // {
    //     path:"/cart",
    //     Component:()=>(
    //         <Cart/>
    //     )
    // }
]

export default AppRoutes;