//https://github.com/SAPConversationalAI/Webchat

import Head from "next/head";
import { useState } from "react";
import Footer from "../components/front/Footer";
import Header from "../components/homepage/header/Header";
import SubHeader from "../components/homepage/header/SubHeader";
import Table from "../components/homepage/table/Table";
import withAuth from "../hocs/withAuth";
import { getName, getRole, useIsAuthenticated } from "../providers/Auth";

// use back with auth
export default withAuth(function Home({ data }) {
  console.log("one");

  const isAuthenticated = useIsAuthenticated();
  const name = getName();
  const role = getRole();
  const [send, setSend] = useState([]);

  // for (var i = 0; i < data.length; i ++) {
  //   if (data[i].org_charityID == )
  //   console.log(data[i].org_charityID);
  // }

  window.webchatMethods = {
    getMemory: (conversationId) => {
      const memory = { ids: Array.from(new Set(send)) };
      return { memory, merge: true };
    },
  };

  return (
    <div className="flex flex-col h-screen">
      <Head>
        <script
          src="https://cdn.cai.tools.sap/webchat/webchat.js"
          // exposing credentials
          channelId="410590c5-18d4-483f-b510-4ce74feac089"
          token="2fffea9e69dda5b5e0a310e686961d96"
          id="cai-webchat"
        ></script>
      </Head>

      <Header name={name} role={role} />

      <SubHeader name={name} role={role} />

      <div className="antialiased bg-gray-200 flex-grow">
        <div className="container mx-auto px-4 sm:px-8 mt-18">
          <Table odata={data} send={send} />
        </div>
      </div>

      <Footer />
    </div>
  );
});

// To-do: Cache request data
// https://stackoverflow.com/questions/62005208/api-caching-for-next-js

// known bug
// fetches data even if not logged in
export async function getStaticProps() {
  console.log("attempting to fetch data");
  //fetch odata
  try {
    const response = await fetch(
      //"https://smucf-dev-ebs-g1t3-srv.cfapps.us10.hana.ondemand.com/api/Beneficiary"
      "https://smucf-dev-ebs-g1t3-srv.cfapps.us10.hana.ondemand.com/api/Beneficiary?$expand=regionID,Stocks"
    );
    var data = await response.json();
    data = data.value;
  } catch (error) {
    let data = {};
    console.log("Error fetching odata");
    return {
      props: {
        data,
      },
      revalidate: 5,
    };
  }

  // final object for prediction
  let stocks = {
    data: [],
  };
  let order = [
    "id",
    "house",
    "biscuit",
    "Egg",
    "vege",
    "rice",
    "canned",
    "beverage",
    "instant",
    "bread",
  ];
  let today = new Date();
  today = today.getMonth() + "/" + today.getDate() + "/" + today.getFullYear();

  for (var i = 0; i < data.length; i++) {
    // if have stock
    if (data[i].Stocks.length != 0) {
      let innerData = {
        id: data[i].beneficiaryID,
        house: data[i].householdSize,
      };
      let ordered = {};
      for (var k = 0; k < data[i].Stocks.length; k++) {
        innerData[data[i].Stocks[k].stock_stockID] =
          data[i].Stocks[k].stockCount;
      }

      // ordering
      for (var k = 0; k < order.length; k++) {
        ordered[order[k]] =
          typeof innerData[order[k]] == "undefined" ? 0 : innerData[order[k]];
      }
      stocks.data.push(ordered);
      data[i].delivery = today;
    }
    // console.log(data[i]);
  }

  if (stocks.data.length > 0) {
    console.log("Querying prediction api");
    let options = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(stocks),
    };
    var prediction;

    try {
      // let prediction = await fetch("http://127.0.0.1:5000/api/predict", options);
      let prediction = await fetch(
        "https://g1t3-foodstock-quick-wallaby-xx.cfapps.us10.hana.ondemand.com/api/predict",
        options
      );
      prediction = await prediction.json();
      var map = new Map();
      for (var i = 0; i < prediction.length; i++) {
        map.set(prediction[i]["id"], prediction[i]["result"]);
      }

      for (let i = 0; i < data.length; i++) {
        // if have stock
        if (data[i].Stocks.length != 0) {
          data[i].stock = map.get(data[i].beneficiaryID);
        }
        // console.log(data[i]);
      }
    } catch (error) {
      console.log("Error posting to prediction api");
      console.log(error);
    }
  }

  console.log("Sucessfully fetched data");
  return {
    props: {
      data,
    },
    revalidate: 5,
  };
}
