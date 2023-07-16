const fs = require('fs');
const csv = require('fast-csv');



function saveData(province, municipality, parentData, childData, stream) {
  if (parentData && childData) {

    // path where output will be stored

    let options = parentData.childOptions[province];
    let parentId = options.indexOf(municipality);
    // let parentId = parentData.parentOptions.indexOf(province);

    let id = 0;
    let rows = [];

    childData.forEach(barangay => {
      rows.push([id, barangay, parentId]);
      id++;
    });

    csv.writeToStream(stream, rows, {headers: ["id", "name", "parentId"]})
    .on('finish', () => {stream.close()});
  }
}

module.exports = {saveData}