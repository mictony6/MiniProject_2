# MiniProject_2

Get all barangays in the Philippines!
We'll achieve this by crawling data from our website.

Here are a few examples of data that can be obtained from our website:

List of all provinces/municipalities in the Philippines:

https://demo.myruntime.com/website/fulfillmentClustersService/api/getPhilClusters/myruntimeWeb
List of all barangays in Miag-ao:

https://demo.myruntime.com/website/fulfillmentClustersService/api/getPhilClusterOptions/myruntimeWeb?parentOption=Iloilo&childOption=Miagao
Main task: Get all barangays in a specified province and municipality/city and save result to a csv file.
For this exercise, you can just declare the province and municipality in a constant variable. Here are the initial variables that you can use:

// For Michael:
const province = 'Iloilo';
const municipality = 'Miagao';
Ideally, you should be able to try all through scenarios in your testing.

The output csv file should have the following headers:

id
name
parentId
You should be able to demonstrate your knowledge in callbacks, promises, and asyc/await functions via the scripts that you will make:

Script #1: Callbacks
HTTP Request - Use the old/deprecated request module. Note that for this script, you should use callbacks, and not promises or await/async.
https://www.npmjs.com/package/request
https://github.com/request/request
https://stackoverflow.com/questions/39329456/request-callback-with-node (Example on using request callback)
For this script, no need to save data in csv file. Just console.log() the array of objects pertaining to the barangays.
Script #1: Promises
HTTP Request - axios
https://www.npmjs.com/package/axios
https://github.com/axios/axios
CSV Formatting - fast-csv
https://www.npmjs.com/package/fast-csv
https://c2fo.github.io/fast-csv/docs/formatting/getting-started/
Script #3: Async/Await
HTTP Request - axios
https://www.npmjs.com/package/axios
https://github.com/axios/axios
CSV Formatting - fast-csv
https://www.npmjs.com/package/fast-csv
https://c2fo.github.io/fast-csv/docs/formatting/getting-started/
Note: You can also create smaller modules (in separate files) for the main scripts, if you prefer.

Stretch Goal #1 - Save all barangays in your province (not just the barangays in your municipality/city)
Stretch Goal #2 - Save all barangays in the Philippines (not just the barangays in your province or in your municipality/city)
For the stretch goals, you can use any of your preferred method - e.g. callbacks, promises, async/await.
