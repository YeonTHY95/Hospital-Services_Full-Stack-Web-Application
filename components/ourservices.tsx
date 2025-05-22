"use client";
import React from 'react';
import Link from "next/link";

const OurServicesComponent = () => {


  return (
    <span className='ourservicescontainer'>
        {/* className='navlinkstyle relative'
        <span > onMouseEnter={setTrueHover} onMouseLeave={setFalseHover} */}
        
            <span className='ourservices'>Our services</span>
        
        
        {//isHover && 
            (<div className="tooltips">
                <div>
                    <ul>
                        <li>
                            <Link href="/ourservices#physiotherapy" className='text-black text-xl font-bold m-[10px] underline decoration-green-500 underline-offset-8 hover:bg-cyan-300 hover:p-[1px] hover:rounded'>Physiotherapy</Link>
                        </li>
                        <li>
                            <Link href="/ourservices#acupuncture" className='text-black text-xl font-bold m-[10px] underline decoration-green-500 underline-offset-8 hover:bg-cyan-300 hover:p-[1px] hover:rounded'>Acupuncture</Link>
                        </li>
                        <li>
                            <Link href="/ourservices#hydromassage" className='text-black text-xl font-bold m-[10px] hover:bg-cyan-300 hover:p-[1px] hover:rounded'>Hydromassage</Link>
                        </li>
                    </ul>
                </div>
                
            </div>)
        }
        
        
    </span>
    
  )
}

export default OurServicesComponent