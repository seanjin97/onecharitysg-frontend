require('dotenv').config()
const axios = require('axios')

async function review(req, res) {

  let data = req.body;
  let url = 'https://smucf-dev-ebs-g1t3-srv.cfapps.us10.hana.ondemand.com/api/$batch';
  let innerList = [];
  
  if (data.ids.length > 0) {

    for (var i = 0; i < data.ids.length; i ++) {
      let row = {
        "id": JSON.stringify(i),
        "method": "POST",
        "url": "/ToReview",
        "headers": {
            "content-type": "application/json; odata.metadata=minimal; odata.streaming=true",
            "odata-version": "4.0"
        },
        "body": {
          "beneficiaryID_beneficiaryID": data.ids[i],
          "status": "restock",
          "other": "null"
        }
      };
      innerList.push(row);
    }

    let payLoad = {
      "requests": innerList
    }
    
    axios.post(url, payLoad,
     {
       headers: {
        'Content-Type': 'application/json'
       }
     })
      .then(res => {
        // let status = data['responses'][0]['status'];
        console.log(data['responses']);
      })
      .catch(error => {
        console.error(error)
      })

      // console.log(JSON.stringify(payLoad));
      res.status(200).end("Sent");
    }
    res.status(200).end();

}

module.exports = {
  review
}