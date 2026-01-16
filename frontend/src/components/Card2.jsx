import React from 'react'

const Card2 = () => {
    const data=[
        {icon:"pi pi-home",
        heading:"Factory-Direct Quality Assurance",
        subheading:"Direct-from-Manufacturer Quality Body: Eliminate the middleman. As the actual manufacturer of your men's fashion line, we oversee every stitch—ensuring premium fabric selection and superior construction that meets global retail standards."
    },
    {icon:"pi pi-box",
        heading:"Seamless Bulk Procurement",
        subheading:"One-Stop Bulk Sourcing Body: Streamline your inventory management. From browsing our latest men's collections to managing large-scale production runs and fulfillment, handle your entire supply chain through one integrated portal."
    },
    {icon:"pi pi-verified",
        heading:"Secure & Protected Transactions",
        subheading:"Enterprise-Grade Payment Security Body: Trade with total peace of mind. Your bulk investments are fully protected with secure payment gateways and transparent milestone tracking, ensuring your capital is safe from the factory floor to your warehouse."
    },
    {icon:"pi pi-user",
        heading:"Growth-Focused Partnerships",
        subheading:"Scalable Solutions for Your Brand Body: Grow your business with a partner that understands scale. Access exclusive bulk-tier pricing, flexible manufacturing capacities, and dedicated support to help your brand stay ahead of men's fashion trends."
    }
    ]
  return (
    <>
        <div className='grid grid-cols-4 gap-8 text-white/80'>
            {data.map((item)=>(<div className='my-3 py-4 px-4 shadow-2xl hover:bg-[#483724] '>
      <div className='hover:text-red-500!'>
        <i className={`${item.icon} text-5xl! ml-30 pb-4 hover:text-red-400`}></i>
      </div>
      <h2 className='text-2xl font-bold pb-4 text-center'>{item.heading}</h2>
      <h4 className='text-md font-semibold'>{item.subheading}</h4>
    </div>
    ))}
        </div>
    </>
  )
}

export default Card2
