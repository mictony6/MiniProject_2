const https = require('https');
const axios = require('axios');
const fs = require("fs");
const csv = require('fast-csv');

// fix for certificate expired
const agent = new https.Agent({
  rejectUnauthorized: false
});

function getData(url){
  return axios.get(url, {httpsAgent:agent})
  .then(res => {
    return new Promise((resolve, reject) => {
      if(res.data && res.data.data){
        resolve(res.data.data);
      }else{
        reject(new Error("Property 'data' dont exist."));
      }
    });

  })
  .catch(e => console.error(e));
}
  
function script2Start(province, municipality){

  const barangaysUrl = `https://demo.myruntime.com/sustainability-run/fulfillmentClustersService/api/getPhilClusterOptions/sustainabilityRun?parentOption=${province}&childOption=${municipality}`;
  const provincesUrl = "https://demo.myruntime.com/website/fulfillmentClustersService/api/getPhilClusters/myruntimeWeb";
  return Promise.all([getData(provincesUrl), getData(barangaysUrl)])
    .then(values =>{
      const [parentData, childData] = values;
  
      const barangays = []

      if(parentData && childData){
        // get parentId
        const options = parentData.childOptions[province];
        const parentId = options.indexOf(municipality);
    
        childData.forEach((barangay, index) => {
          barangays.push({id:index, name:barangay, parentId});
        });
      }
      return barangays;
    })
    .then(barangays => {
      // write to csv file
      const filepath = __dirname + "/script2_output.csv";
      let writeStream = fs.createWriteStream(filepath); // the output stream
      csv.writeToStream(writeStream, barangays, {headers:['id', 'name', 'parentId']})
        .on('finish', ()=>{writeStream.close()});

      return {province, municipality, barangays};
    })
    .catch(e=>console.log(e));
  
}

module.exports = {script2Start};
