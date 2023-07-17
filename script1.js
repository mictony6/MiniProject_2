const request = require('request');

function script1Start(province, municipality, callback) {
  try {
    const barangaysUrl = `https://demo.myruntime.com/sustainability-run/fulfillmentClustersService/api/getPhilClusterOptions/sustainabilityRun?parentOption=${province}&childOption=${municipality}`;
    const req = {
      url: barangaysUrl,
      method: 'GET',
      agentOptions: {
        rejectUnauthorized: false
      }
    };

    request(req, (err, res, body) => {
      if (callback) {
        callback(err, JSON.parse(body));
      }
    });
  } catch (error) {
    console.error(error);
  }
}

const province = 'Iloilo',
  municipality = 'Miagao';
script1Start(province, municipality, (err, data) => {
  for (let barangay of data.data) {
    console.log(barangay);
  }
});
