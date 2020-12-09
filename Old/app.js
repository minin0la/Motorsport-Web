var express     = require("express"),
creds             = require('./client_secret.json'),
app               = express();
fs                = require('fs');
const http = require('http');
const { GoogleSpreadsheet } = require('google-spreadsheet');
var file = __dirname + '/data.json';


app.set("view engine", "ejs");

app.use(express.static(__dirname+"/public"));


// app.get("/test", async (req, res) => {
//     var doc = new GoogleSpreadsheet('15DYvEO8E9XgdMELZusNylrmbgdX-wzlPK5jiB7F8y2M');

//     await doc.useServiceAccountAuth(creds)
//     await doc.loadInfo(); // loads document properties and worksheets
//     const sheet = doc.sheetsByIndex[0];
//     const rows = await sheet.getRows();
//     res.render('pages/test', {rows:data});


// });

app.get("/", async (req, res) => {
  fs.readFile(file, 'utf8', function (err, data) {
    if (err) {
    console.log('Error: ' + err);
    return;
    }
  
  data = JSON.parse(data);
  res.render('pages/home',  {rows:data});
});
});

app.get("/all", async (req, res) => {
  fs.readFile(file, 'utf8', function (err, data) {
    if (err) {
    console.log('Error: ' + err);
    return;
    }
  
  data = JSON.parse(data);
  res.render('pages/all', {rows:data});
});
});
app.get("/byclass", async (req, res) => {
  fs.readFile(file, 'utf8', function (err, data) {
    if (err) {
    console.log('Error: ' + err);
    return;
    }
  
  data = JSON.parse(data);
  res.render('pages/byclass', {rows:data, class: req.query.name});
});
});
app.get("/carinfo", async (req, res) => {
  fs.readFile(file, 'utf8', function (err, data) {
    if (err) {
    console.log('Error: ' + err);
    return;
    }
  
  data = JSON.parse(data);
  res.render('pages/carinfo', {rows:data, carname: req.query.name});
});


});


  
  const server = http.createServer(app);
  const port = 3000;
  server.listen(port);
  console.debug('Server listening on port ' + port);