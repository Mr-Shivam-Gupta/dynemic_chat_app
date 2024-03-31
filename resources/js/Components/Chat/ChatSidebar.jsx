import { Link } from "@inertiajs/react";
import React, { useState, useEffect } from 'react';


export default function ChatSidebar({users , echo }) {
    const [userStatus, setUserStatus] = useState({});
   
    useEffect(() => { 

        Echo.join('status-update').here((user) => {
            const statuses = {};
            users.forEach(user => {
                statuses[user.id] = false;
                console.log('here : ' +user.id)
            });
        }).joining((user) => {
             setUserStatus(prevStatus => ({ ...prevStatus, [user.id]: true }));
        }).leaving((user) => {
             setUserStatus(prevStatus => ({ ...prevStatus, [user.id]: false }));
        });
    });
    
    return (
       <>
         <div className="basis-2/6 border-r border-slate-100 bg-white pt-3">
                            <div className="search-box h-10 text-slate-300">
                                <div className="flex justify-between border-b border-slate-100 px-5 pb-1">
                                    <form>
                                        <i className="fa fa-search"></i>
                                        <input type="search" className="font-light border-0 hover:border-0 focus:border-0 focus:ring-0 !shadow-none focus:!outline-none" placeholder="Search" />
                                    </form>
                                    <div>
                                        <button className="relative">
                                            <i className="fa fa-message"></i>
                                            <i className="fa fa-plus absolute -top-2 text-sm"></i>
                                        </button>
                                    </div>
                                </div>
                            </div>
                            <div className="user-list h-screen overflow-y-auto">
                            {users.map((user, index) => (
                                <Link  key={index} href={`/chat/${user.id}`}className="flex px-5 py-3 transition hover:cursor-pointer hover:bg-slate-100 justify-between ">
                                    <div className="flex">
                                    <div className="pr-4">
                                        {user?.image !== undefined ? (
                                            <img src="https://cdn-icons-png.flaticon.com/512/194/194938.png" alt="User" width="50" />
                                        ) : (
                                            <i className="fa fa-user-circle text-gray-300 text-5xl"></i>
                                        )}
                                    </div>
                                    <div className="flex flex-col">
                                        <h3 className="text-md text-violet-500">{user.name.length > 0 ? user.name : 'N/A'}</h3>
                                        <p className="h-5 overflow-hidden text-sm font-light text-gray-400">{user.message}</p>
                                    </div>
                                    </div>
                                    <div className="flex flex-col">
                                   
                                    <p>
                                <span className={userStatus[user.id] ? "text-green-500 text-sm" : "text-red-500 text-sm"}>
                                    {userStatus[user.id] ? 'Online' : 'Offline'}
                                </span>
                            </p>

                                        {/* <p><span className="text-green-500 text-sm">online</span></p> */}
                                    </div>
                                    
                                </Link>
                            ))}
                        </div>

                        </div>
       </>
    );
}
