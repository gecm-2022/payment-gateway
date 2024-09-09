import React, { useEffect, useState } from "react";
import { useAuth } from "../context/contextapi";
import { NavLink } from "react-router-dom";

const Dashboard = () => {
  const { user, userdata ,wallet} = useAuth();
  const [accountNumber, setAccountNumber] = useState(null);
  // const [balance, setBalance] = useState); // Example state for wallet balance
  const [points, setPoints] = useState(0); // Example state for POINT-S

  useEffect(() => {
    userdata();
  }, []);

  return (
    <div className="m-5 p-5 bg-white text-black rounded-lg border border-gray-300 shadow-md">
      <div className="flex items-center mb-5">
        <img
          src="/account.png"
          alt="account"
          width={30}
          height={30}
          className="mr-3"
        />
        <p className="font-semibold text-lg text-black"> {user.username}</p>
      </div>
      <div className="flex justify-between items-center text-center my-5">
        <div className="text-sm pb-5">
          <p className="text-gray-600">Recharge wallet</p>
        </div>
        <div className="">
          <p className="font-bold ">{wallet}</p>
          <p className="text-gray-600">Balance wallet</p>
        </div>
        <div className="">
          <p className="font-bold ">{points}</p>
          <p className="text-gray-600">POINT-S</p>
        </div>
      </div>
      <div className="flex justify-around text-white mt-5 ">
        <NavLink to={"/recharge"}>
          <button className="flex items-center bg-yellow-500 px-7 py-2 mx-2 rounded-3xl shadow">
            <img
              src="/recharge.png"
              alt="Recharge"
              width={20}
              height={20}
              className="mr-2"
            />
            Recharge
          </button>
        </NavLink>
        <NavLink to={"/withdraw"}>
          <button className="flex items-center bg-yellow-500 px-7 mx-2 py-2 rounded-3xl border-[1.5px]  shadow">
            <img
              src="/withdraw.png"
              alt="Withdraw"
              width={20}
              height={20}
              className="mr-2"
            />
            Withdraw
          </button>
        </NavLink>
      </div>
    </div>
  );
};

export default Dashboard;
