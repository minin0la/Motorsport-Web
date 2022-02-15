
const express = require('express');
const app = express();  
const mysql = require('mysql');
const port = process.env.PORT || 9000

// Conection to DB
const connection = mysql.createConnection({
    host:
})

app.set('view engine', 'ejs')

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "http://localhost:3000"); // update to match the domain you will make the request from
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });

app.get('/getstocks', (req, res) => {
    var axios = require('axios');
    var data = '{"username":"minin0la","password":"Mnnl1480@ecrp"}';
    var token = ''

    var config = {
        method: 'post',
        url: 'https://api.eclipse-rp.net/auth/login',
        headers: {
            'Accept': 'application/json, text/plain, */*',
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/98.0.4758.87 Safari/537.36',
            'Content-Type': 'application/json;charset=UTF-8',
            'Sec-GPC': '1',
            'Sec-Fetch-Site': 'same-site',
            'Sec-Fetch-Mode': 'cors',
            'Sec-Fetch-Dest': 'empty'
        },
        data: data
    };

    axios(config)
        .then(function (response) {
            token = response.data.token
            console.log(token);
            var config = {
                method: 'get',
                url: 'https://api.eclipse-rp.net/basic/vehicledealerships',
                headers: {
                    'Accept': 'application/json, text/plain, */*',
                    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/98.0.4758.87 Safari/537.36',
                    'token': token,
                    'Sec-GPC': '1',
                    'Sec-Fetch-Site': 'same-site',
                    'Sec-Fetch-Mode': 'cors',
                    'Sec-Fetch-Dest': 'empty'
                }
            };
            axios(config)
                .then(function (response) {
                    res.send(JSON.stringify(response.data.dealerships[2].VehicleStocks));
                })
                .catch(function (error) {
                    console.log(error);
                });
        })
        .catch(function (error) {
            console.log(error);
        });




})

app.listen(port, () => console.log('Listening on port 9000....'))