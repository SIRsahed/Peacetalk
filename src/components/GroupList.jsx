import React from 'react'
import Profile from '../assets/profile.png';
import { BsThreeDotsVertical } from "react-icons/bs";

const GroupList = () => {
    return (
        <>
            <div className="shadow-lg rounded-xl px-5 mt-3">
                <div className="flex justify-between items-center mb-2">
                    <h3 className="text-xl font-semibold">Group List</h3>
                    <BsThreeDotsVertical className="text-xl" />
                </div>
                <div className="flex justify-between items-center py-4 border-b-[1px] ">
                    <div className="">
                        <img src={Profile} alt="" className="w-18" />
                    </div>
                    <div className="">
                        <h4>User Name</h4>
                        <p>Hey Guys, what's up!</p>
                    </div>
                    <div className="">
                        <button className='px-5 bg-btn text-white rounded-md py-1'>Join</button>
                    </div>
                </div>
                <div className="flex justify-between items-center py-4 border-b-[1px] ">
                    <div className="">
                        <img src={Profile} alt="" className="w-18" />
                    </div>
                    <div className="">
                        <h4>User Name</h4>
                        <p>Hey Guys, what's up!</p>
                    </div>
                    <div className="">
                        <button className='px-5 bg-btn text-white rounded-md py-1'>Join</button>
                    </div>
                </div>
                <div className="flex justify-between items-center py-4 border-b-[1px] ">
                    <div className="">
                        <img src={Profile} alt="" className="w-18" />
                    </div>
                    <div className="">
                        <h4>User Name</h4>
                        <p>Hey Guys, what's up!</p>
                    </div>
                    <div className="">
                        <button className='px-5 bg-btn text-white rounded-md py-1'>Join</button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default GroupList
