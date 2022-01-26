import React, { useState, useEffect } from 'react';
import User from './User';
import Restock from './Restock';
import DataReq from './DataReq';

export default function Side({userData, restockData, requestData }) {

  const [show, setShow] = useState(null);
  const [user, setUser] = useState(null);

  const showData = () => {
    setShow("data");
  };

  const showRes= () => {
    setShow("restock");
  };

  const showUser = () => {
    setShow("user");
  };

  return (
    <div className="flex flex-wrap">
      <ul className="border-1 rounded-lg w-auto">
        <li className="my-px">
          <span className="flex font-medium text-sm text-gray-800 px-4 my-4 uppercase justify-center">Selection</span>
        </li>

        <li className="my-px">
          <a href="#"
            className="flex flex-row items-center h-12 px-4 rounded-lg text-black hover:bg-gray-400 "
            onClick={showData}
            >
            <span className="flex items-center justify-center text-lg text-gray-400">
              <svg fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
                stroke="currentColor"
                className="h-6 w-6">
                <path d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4"></path>
              </svg>
            </span>
            <span className="ml-3 mr-2">Data Requests</span>
            <span className="flex items-center justify-center text-sm text-gray-500 font-semibold bg-gray-200 h-6 px-2 rounded-full ml-auto">{requestData.length > 0 ? requestData.length : 0 }</span>
            
          </a>
        </li>

        <li className="my-px">
          <a href="#"
            className="flex flex-row items-center h-12 px-4 rounded-lg text-black hover:bg-gray-400"
            onClick={showRes}>
            <span className="flex items-center justify-center text-lg text-gray-400">
              <svg fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
                stroke="currentColor"
                className="h-6 w-6">
                <path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"></path>
              </svg>
            </span>
            <span className="ml-3 mr-2">Restock Requests</span>
            <span className="flex items-center justify-center text-sm text-gray-500 font-semibold bg-gray-200 h-6 px-2 rounded-full ml-auto">{restockData.length > 0 ? restockData.length : 0 }</span>
            
          </a>
        </li>

        <li className="my-px">
          <a href="#"
            className="flex flex-row items-center h-12 px-4 rounded-lg text-black hover:bg-gray-400"
            onClick={showUser}>
            <span className="flex items-center justify-center text-lg text-gray-400">
              <svg fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
                stroke="currentColor"
                className="h-6 w-6">
                <path d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path>
              </svg>
            </span>
            <span className="ml-3 mr-2">User Accounts</span>
            <span className="flex items-center justify-center text-sm text-gray-500 font-semibold bg-gray-200 h-6 px-2 rounded-full ml-auto">{userData.length > 0 ? userData.length : 0 }</span>
          </a>
        </li>
      
      </ul>

      <div className="ml-2 flex-grow border-1 rounded-lg w-3/4">

        <p className="w-full text-center py-6 text-black font-bold text-lg"> 
          { show == null ? "Select an option to display" : <></>}
          { show == "user" ? "User Details" : <></>}
          { show == "restock" ? "Restock Requests" : <></>}
          { show == "data" ? "Data Requests" : <></>}
        </p>

        { show == "user" ? <User data={userData} /> : <></> }
        { show == "restock" ? <Restock data={restockData} /> : <></> }
        { show == "data" ? <DataReq data={requestData} /> : <></> }

      </div>
    </div>
  );
}