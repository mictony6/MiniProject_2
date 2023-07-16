const request = require('request');

function script1Start(province, municipality, cb){
  
  const barangaysUrl = `https://demo.myruntime.com/sustainability-run/fulfillmentClustersService/api/getPhilClusterOptions/sustainabilityRun?parentOption=${province}&childOption=${municipality}`;
  
  const req = {
    url: barangaysUrl,
    method: 'GET',
    agentOptions: {
      rejectUnauthorized:false
    }
  }

  try {
    request(req, (err, res, body)=>{
      if(cb){
        cb(err, JSON.parse(body))
      }
    });

  } catch (error) {
    console.error(error);
  }

}


module.exports = {script1Start};

