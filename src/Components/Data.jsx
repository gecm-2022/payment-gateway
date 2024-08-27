import React from 'react'

const Data = () => {
    return (
        <div className='m-5 p-5 bg-white text-black rounded-lg border border-gray-300 shadow-md'>
            <div className="flex justify-around text-center my-3">
                <div className="">
                    <p className="font-bold text-xl">0</p>
                    <p className="text-gray-600">Total recharge</p>
                </div>
                <div className="">
                    <p className="font-bold text-xl">0</p>
                    <p className="text-gray-600">Total withdraw</p>
                </div>
                <div className="">
                    <p className="font-bold text-xl">0</p>
                    <p className="text-gray-600">Total assets</p>
                </div>
            </div>
            <div className="flex justify-around text-center my-3">
                <div className="">
                    <p className="font-bold text-xl">0</p>
                    <p className="text-gray-600">Today's income</p>
                </div>
                <div className="">
                    <p className="font-bold text-xl">0</p>
                    <p className="text-gray-600">Team income</p>
                </div>
                <div className="">
                    <p className="font-bold text-xl">0</p>
                    <p className="text-gray-600">Total income</p>
                </div>
            </div>
        </div>
    )
}

export default Data;
