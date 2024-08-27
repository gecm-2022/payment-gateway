import React from 'react';
import { NavLink } from 'react-router-dom';

const Options = () => {
    return (
        <div className=' min-h-screen p-5'>
            {/* First List */}
            <ul className="border border-gray-300 rounded-lg shadow-md bg-white m-5 p-4">
                {[
                    { img: '/order.png', label: 'My Order' ,link:'/myorder'},
                    { img: '/transaction.png', label: 'Transaction',link:'/transaction' },
                    { img: '/myacc.png', label: 'My bank account',link:'/mybankaccount' },
                    { img: '/gift.png', label: 'Gift',link:'/gift' },
                    { img: '/onlineSer.png', label: 'Online service' ,link:'/onlineservice'},
                    { img: '/team.png', label: 'My team' ,link:'/myteam'},
                ].map((item, index) => (
                    <NavLink key={index} to={item.link}>

                    <li  className="cursor-pointer flex items-center justify-between border-b border-gray-200 py-3 px-5 last:border-b-0">
                        <div className="bg-gray-200 rounded-full p-2">
                            <img src={item.img} alt={item.label} width={30} height={30} />
                        </div>
                        <p className="text-gray-800 font-semibold">{item.label}</p>
                        <div className="text-2xl text-gray-500">&gt;</div>
                    </li>
                    </NavLink>
                ))}
            </ul>

            {/* Second List */}
            <ul className="border cursor-pointer border-gray-300 rounded-lg shadow-md bg-white m-5 p-4">
                {[
                    { img: '/withpass.png', label: 'Withdraw password' ,link:"/withdrawpassword"},
                    { img: '/withpass.png', label: 'Change password',link:"/changepassword" },
                    { img: '/logout.png', label: 'Log Out',link:"/logout"  },
                ].map((item, index) => (
                <NavLink to={item.link} key={index} >

                    <li className="flex items-center justify-between border-b border-gray-200 py-3 px-5 last:border-b-0">
                        <div className="bg-gray-200 rounded-full p-2">
                            <img src={item.img} alt={item.label} width={30} height={30} />
                        </div>
                        <p className="text-gray-800 font-semibold">{item.label}</p>
                        <div className="text-2xl text-gray-500">&gt;</div>
                    </li>
                </NavLink>
                ))}
            </ul>
        </div>
    );
};

export default Options;
