import { SettingsSharp } from "@material-ui/icons";
import React, { useState } from "react";

export default function User({data}) {
  
  const [ options, setOptions ] = useState({})
  const [show, setShow] = useState(false);
  const [status, setStatus] = useState(null);
  const [error, setError] = useState(false);

  const editType = async (e) => { 
    console.log("Sending");

    const url = "https://cors-anywhere.herokuapp.com/https://smucf-dev-ebs-g1t3-srv.cfapps.us10.hana.ondemand.com/api/User('"+e.target.id+"')";
    const payLoad = {};
    const id = e.target.id;
    const value = options[e.target.id];
    let op = options;
    op[id] = value;
    payLoad["userType"] = value;
    // console.log(payLoad);

    let requestOptions = {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payLoad)
    };

    try {
      const response = await fetch(url, requestOptions);
      const data = await response.json();

      if (response.ok) {
        setOptions(op); 
        setShow(true);
        setError(false);
        setStatus("Edit complete");
        console.log("success");
      }
      else {  
        console.log("some problem");
        // console.log(data.error.message);
        setShow(false);
        setError(true);
        setStatus("Problem editing user!");
      }
    } catch (error) {
      console.log("error");
      setShow(false);
      setError(true);
      setStatus("Problem reaching server!");
    }
    console.log("Out");
  }

  const pushOptions = (e) => { 
    let key = e.target.id;
    let value = e.target.value;
    options[key] = value;
    console.log(options);
  }

  const close = () => {
    setError(false);
    setShow(false);
  }

  const GreenAlert = () => {
    return (
      <div
        className='w-2/4 bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative mb-4  mx-auto'
        role='alert'
      >
        <span className='block sm:inline'> {status}  </span>
        <span
          className='absolute top-0 bottom-0 right-0 px-4 py-3'
          onClick={close}
        >
          <svg
            className='fill-current h-6 w-6 text-green-500'
            role='button'
            xmlns='http://www.w3.org/2000/svg'
            viewBox='0 0 20 20'
          >
            <title>Close</title>
            <path d='M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z' />
          </svg>
        </span>
      </div>
    )
  }

  const RedAlert = () => {
    return (
      <div
        className='w-2/4 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4 mx-auto'
        role='alert'
      >
        <span className='block sm:inline'>{status}</span>
        <span
          className='absolute top-0 bottom-0 right-0 px-4 py-3'
          onClick={close} 
        > 
          <svg
            className='fill-current h-6 w-6 text-red-500'
            role='button'
            xmlns='http://www.w3.org/2000/svg'
            viewBox='0 0 20 20'
          >
            <title>Close</title>
            <path d='M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z' />
          </svg>
        </span>
      </div>
    )
  }

  return (
    <div>
    { show ? <GreenAlert /> : null }
    { error ? <RedAlert /> : null }
    <table className="min-w-full divide-y divide-gray-200">
      <thead >
        <tr>
          <th className="px-6 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
            Name
          </th>
          <th className="px-6 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
            Email
          </th>
          <th className="px-6 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
            UserType
          </th>
          <th className="px-6 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
            Edit Type
          </th>
          <th className="px-6 py-3 bg-gray-50"></th>
        </tr>
      </thead>

      <tbody className="bg-white divide-y divide-gray-200">
        {data.map((row, i) => (
          options[row.userID] = row.userType,
          <tr key={i} className="flex lg:table-row flex-wrap">
          <td className="px-6 py-4 whitespace-no-wrap">
            <div className="text-sm leading-5 text-gray-900">{row.name}</div>
          </td>

          <td className="px-6 py-4 whitespace-no-wrap text-sm leading-5 text-gray-500">
            <p>{row.email ? row.email : "None" }</p>
          </td>

          <td className="px-6 py-4 whitespace-no-wrap">
            {
              options[row.userID] == null ?     
              <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-gray-200 text-gray-800">
                {"None"}
              </span>
              :
              options[row.userID] == "volunteer" ?     
                <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-200 text-green-800">
                {options[row.userID]}
                </span>
              :
              options[row.userID] == "Admin" ?  
                <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-200 text-blue-800">
                {options[row.userID]}
                </span>
                :
                <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-200 text-red-800">
                {options[row.userID]}
                </span>
            }
          </td>
          
          <td className="px-6 py-4 whitespace-no-wrap text-right text-sm leading-5 font-medium">
            <select name="types" id={row.userID} className="float-left" onChange={pushOptions}> 
              <option value data-isdefault="true">--Edit--</option>
              <option value="volunteer">Volunteer</option>
              <option value="admin">Admin</option>
              <option value="msf">MSF</option>
              <option value="none">None</option>
            </select>
          </td>

          <td className="px-6 py-4 whitespace-no-wrap text-right text-sm leading-5 font-medium">
            <button className="text-indigo-600 hover:text-indigo-900"
              id = {row.userID}
              onClick={editType}
            >
              Save
            </button>
          </td>

          </tr>
        ))}
      </tbody>

    </table>
    </div>
  )
}