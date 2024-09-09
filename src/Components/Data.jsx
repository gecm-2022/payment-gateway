import React from "react";
import { useAuth } from "../context/contextapi";

const Data = () => {
  const { TotalRecharge,TotalWithdrawal } = useAuth();
  return (
    <div className="m-5 p-5 bg-white text-black rounded-lg border border-gray-300 shadow-md">
      <div className="flex justify-around text-center my-3">
        <div className="">
          <p className="font-bold text-xl">{TotalRecharge}</p>
          <p className="text-gray-600 text-sm">Total recharge</p>
        </div>
        <div className="">
          <p className="font-bold text-xl">{TotalWithdrawal}</p>
          <p className="text-gray-600 text-sm">Total withdraw</p>
        </div>
        <div className="">
          <p className="font-bold text-xl">0</p>
          <p className="text-gray-600 text-sm">Total assets</p>
        </div>
      </div>
      <div className="flex justify-around text-center my-3">
        <div className="">
          <p className="font-bold text-xl">0</p>
          <p className="text-gray-600 text-sm">Today's income</p>
        </div>
        <div className="">
          <p className="font-bold text-xl">0</p>
          <p className="text-gray-600 text-sm">Team income</p>
        </div>
        <div className="">
          <p className="font-bold text-xl">0</p>
          <p className="text-gray-600 text-sm">Total income</p>
        </div>
      </div>
    </div>
  );
};

export default Data;
