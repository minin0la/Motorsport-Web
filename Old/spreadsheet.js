const { disconnect } = require('process');

(async function() {

  const { GoogleSpreadsheet } = require('google-spreadsheet');
  var creds = require('./client_secret.json');

  // Create a document object using the ID of the spreadsheet - obtained from its URL.
  var doc = new GoogleSpreadsheet('15DYvEO8E9XgdMELZusNylrmbgdX-wzlPK5jiB7F8y2M');

  // Authenticate with the Google Spreadsheets API.
  await doc.useServiceAccountAuth(creds);

  await doc.loadInfo(); // loads document properties and worksheets
  console.log(doc.title);


    // create a sheet and set the header row
  // const sheet = await doc.addSheet({ headerValues: ['name', 'email'] });
  const sheet = doc.sheetsByIndex[0];

  const rows = await sheet.getRows(); // can pass in { limit, offset }

  // read/write row values
  console.log(rows[0].Name); // 'Larry Page'

}());