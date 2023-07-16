const https = require('https');
const axios = require('axios');
const fs = require("fs");
const csv = require('fast-csv');


// fix for certificate expired
const agent = new https.Agent({
  rejectUnauthorized: false
});

async function getData(url){
  try{
    const res = await axios.get(url, {httpsAgent: agent});
    if(res.data && res.data.data && res.data.data){
      return res.data.data;
    }
  }
  catch (e){
    console.error(e);
  }
}

async function script3Start(province, municipality){
  try {
    //params
    const barangaysUrl = `https://demo.myruntime.com/sustainability-run/fulfillmentClustersService/api/getPhilClusterOptions/sustainabilityRun?parentOption=${province}&childOption=${municipality}`;
    const provincesUrl = "https://demo.myruntime.com/website/fulfillmentClustersService/api/getPhilClusters/myruntimeWeb";
  
    // fetch data from web
    const parentData = await getData(provincesUrl);
    const childData = await getData(barangaysUrl);
  
    //array of barangays in the municipality as objects
    const barangays = [];

    if(parentData && childData){
      // get parentId
      const options = parentData.childOptions[province];
      const parentId = options.indexOf(municipality);
  
      childData.forEach((barangay, index) => {
        barangays.push({id:index, name:barangay, parentId});
      });
  
      // write to csv file
      const filepath = __dirname + "/script3_output.csv";
      let writeStream = fs.createWriteStream(filepath); // the output stream
      csv.writeToStream(writeStream, barangays, {headers:['id', 'name', 'parentId']})
        .on('finish', ()=>{writeStream.close()});
    }
    //returns a promise for the endpoint
    return {province, municipality, barangays};
  
  } catch (error) {
    console.error(error);
  }
}


module.exports = {script3Start};