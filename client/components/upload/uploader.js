import React, { useState } from "react";
import * as XLSX from "xlsx";
import DataTable from "react-data-table-component";
import { Clear } from "@material-ui/icons";

export default function Uploader() {

  const [columns, setColumns] = useState([]);
  const [data, setData] = useState([]);
  const [payload, setPayload] = useState([]);

  const [show, setShow] = useState(false);
  const [status, setStatus] = useState(null);
  const [error, setError] = useState(false);
  const [uploading, setUploading] = useState(false);

  const ref = React.useRef();

  // process CSV data
  const processData = (dataString) => {
    const dataStringLines = dataString.split(/\r\n|\n/);
    const headers = dataStringLines[0].split(
      /,(?![^"]*"(?:(?:[^"]*"){2})*[^"]*$)/
    );
    
    var check = ['postcode', 'householdSize', 'numWorkingAdults','noOfChildren'];
    const list = [];
    for (let i = 1; i < dataStringLines.length; i++) {
      const row = dataStringLines[i].split(
        /,(?![^"]*"(?:(?:[^"]*"){2})*[^"]*$)/
      );
      if (headers && row.length == headers.length) {
        const obj = {};
        for (let j = 0; j < headers.length; j++) {
          let d = row[j];
          if (d.length > 0) {
            if (d[0] == '"') {
              d = d.substring(1, d.length - 1);
            }
            if (d[d.length - 1] == '"') {
              d = d.substring(d.length - 2, 1);
            }
          }

          if (headers[j]) {
            if (check.includes(headers[j])) {
              obj[headers[j]] = parseInt(d);
            } 
            else if (headers[j] == "lastDelivery" && d != "") {
              d = new Date(d);
              let year = d.getFullYear();
              let date = `${d.getDate()}`.padStart(2, "0")
              let month = `${d.getMonth() + 1}`.padStart(2, "0")
              obj[headers[j]] = [year, month, date].join('-');
            }
            else {
              obj[headers[j]] = d;
            }
          }
        }

        if (Object.values(obj).filter((x) => x).length > 0) {
          let main = {
            "id": JSON.stringify(i),
            "method": "POST",
            "url": "/Beneficiary",
            "headers": {
                "content-type": "application/json; odata.metadata=minimal; odata.streaming=true",
                "odata-version": "4.0"
            },
            "body": obj
          }
          // if (i <= 1) {
          // obj['Stocks'] = [
          //   {
          //     "stock_stockID": "canned",
          //     "stockCount": 14
          //   },
          //   {
          //       "stock_stockID": "egg",
          //       "stockCount": 30
          //   },
          //           {
          //       "stock_stockID": "rice",
          //       "stockCount": 1956
          //   },
          //   {
          //     "stock_stockID": "beverage",
          //     "stockCount": 16
          //   },
          //   {
          //     "stock_stockID": "instant",
          //     "stockCount": 6
          //   },
          //   {
          //     "stock_stockID": "bread",
          //     "stockCount": 12
          //   },
          //   {
          //     "stock_stockID": "vege",
          //     "stockCount": 3581
          //   },
          //   {
          //     "stock_stockID": "biscuit",
          //     "stockCount": 522
          //   }]
          // }
          // else {
          //   obj['Stocks'] = [
          //     {
          //       "stock_stockID": "canned",
          //       "stockCount": 12
          //     },
          //     {
          //         "stock_stockID": "egg",
          //         "stockCount": 30
          //     },
          //     {
          //         "stock_stockID": "rice",
          //         "stockCount": 10000
          //     },
          //     {
          //       "stock_stockID": "beverage",
          //       "stockCount": 12
          //     },
          //     {
          //       "stock_stockID": "instant",
          //       "stockCount": 24  
          //     },
          //     {
          //       "stock_stockID": "bread",
          //       "stockCount": 24
          //     },
          //     {
          //       "stock_stockID": "vege",
          //       "stockCount": 1200
          //     },
          //     {
          //       "stock_stockID": "biscuit",
          //       "stockCount": 1000
          //     }]
          // }
          payload.push(main);
          list.push(obj);
        }

        // prepare columns list from headers
        const columns = headers.map((c) => ({
          name: c,
          selector: c,
        }));

        setData(list);
        setColumns(columns);
      }
    }
    setPayload({
      "requests": payload
    });
  };

  // handle file upload
  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onload = (evt) => {
      /* Parse data */
      const bstr = evt.target.result;
      const wb = XLSX.read(bstr, { type: "binary" });
      /* Get first worksheet */
      const wsname = wb.SheetNames[0];
      const ws = wb.Sheets[wsname];
      /* Convert array of arrays */
      const data = XLSX.utils.sheet_to_csv(ws, { header: 1 });

      processData(data);
    };
    reader.readAsBinaryString(file);
  };

  const submitPayload = async () => {
    setUploading(true);

    let url = 'https://cors-anywhere.herokuapp.com/https://smucf-dev-ebs-g1t3-srv.cfapps.us10.hana.ondemand.com/api/$batch';
    // let url = 'https://cors-anywhere.herokuapp.com/http://localhost:4004/api/$batch';
    // console.log(JSON.stringify(payload));

    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    };

    try {
      console.log("attempting to send data");
      // console.log(payload);

      const response = await fetch(url, requestOptions);
      const data = await response.json();
      console.log("data :" +JSON.stringify(data));

      if (response.ok) {
        let status = data['responses'][0]['status'];
        if (status > 299) {
          console.log("Problem uploading data");
          setError(true);
          setStatus('Input in wrong format!\n' + 'Ensure ints are int, strings are string, date in YYYY-MM-DD format!\n'+'Or data might already exist!');
        }
        else {

          console.log("Succesfully uploaded data");
          setShow(true);
          setStatus('Successfully uploaded data');
        }
      }
      else {
        console.log("Problem uploading data");
        setError(true);
        setStatus('Problem uploading data');
      }
    } catch (error) {
      console.log("Error :"+error);
      setError(true);
      setStatus('Server might be down!');
    }
    setUploading(false);
  }

  const clearData = () => {
    ref.current.value = ""
    setData([]);
    setColumns([]);
    setPayload([]);
    setShow(false);
    setStatus(null);
    setError(false);
    setUploading(false);
  }

  const UploadInput = () => {
    return (
      <button
        id="upload" name="upload" 
        className="cursor-pointer hover:bg-gray-600 py-1 px-4 rounded focus:outline-none focus:shadow-outline ml-4 border border-black"
        onClick={submitPayload} disabled={uploading} 
      >
        {uploading ? "Uploading data..." : "Upload data"}
      </button>
    )
  }

  const ClearInput = () => {
    return (
      <button
        type="submit" id="clear" name="clear" value="Clear data"
        className="cursor-pointer hover:bg-gray-600 py-1 px-4 rounded focus:outline-none focus:shadow-outline ml-4 border border-black"
        onClick={clearData} disabled={uploading} 
      >
        Clear Data
      </button>
    )
  }

  const close = () => {
    setError(false);
    setShow(false);
  }

  const GreenAlert = () => {
    return (
      <div
        className='w-2/4 bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative mb-4'
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
        className='w-2/4 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4'
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
    <div className="container mx-auto px-4 sm:px-8 mt-18 flex-grow h-full">
      <div className="py-8 flex-grow flex-col flex bg-white shadow-lg rounded px-8 pt-6 pb-8 mb-4 mt-4 h-auto items-center">

        { show ? <GreenAlert /> : null }
        { error ? <RedAlert /> : null }

        <h1>
          <b>Upload CSV file of beneficiaries</b>
        </h1>

        <div>
        <input
          type="file"
          accept=".csv,.xlsx,.xls"
          className="cursor-pointer hover:bg-gray-600 py-4 px-4 rounded focus:outline-none focus:shadow-outline mx-auto"
          ref={ref}
          onChange={handleFileUpload}
        />
        {data.length > 0 ? <UploadInput/> : <></>}
        {data.length > 0 ? <ClearInput/> : <></>}
        </div>

        <DataTable pagination highlightOnHover columns={columns} data={data} />
      </div>
    </div>
  );
};