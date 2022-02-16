const express = require("express");
const app = express();
const mysql = require("mysql");
const port = process.env.PORT || 9000;

// Conection to DB
// const connection = mysql.createConnection({
//   host: "eu-cdbr-west-02.cleardb.net",
//   user: "b11e939b605b41",
//   password: "2bd29fd6",
// });

var connection;
var cron = require("node-cron");
var axios = require("axios");

function handleDisconnect() {
  connection = mysql.createConnection({
    host: "eu-cdbr-west-02.cleardb.net",
    user: "b11e939b605b41",
    password: "2bd29fd6",
  }); // Recreate the connection, since
  // the old one cannot be reused.
  console.log("Connecting");

  connection.connect(function (err) {
    // The server is either down
    if (err) {
      // or restarting (takes a while sometimes).
      console.log("error when connecting to db:", err);
      setTimeout(handleDisconnect, 2000); // We introduce a delay before attempting to reconnect,
    } // to avoid a hot loop, and to allow our node script to
  }); // process asynchronous requests in the meantime.
  // If you're also serving http, display a 503 error.
  connection.on("error", function (err) {
    console.log("db error", err);
    if (err.code === "PROTOCOL_CONNECTION_LOST") {
      // Connection to the MySQL server is usually
      handleDisconnect(); // lost due to either server restart, or a
    } else {
      // connnection idle timeout (the wait_timeout
      throw err; // server variable configures this)
    }
  });
}

handleDisconnect();

app.set("view engine", "ejs");

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
  // res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

app.get("/mysql", (req, res) => {
  connection.query(
    "SELECT * FROM heroku_894cd5ce4010198.vehicles",
    function (err, result, fields) {
      if (err) throw err;
      res.send(result);
    }
  );
});



cron.schedule("*/10 * * * *", () => {
  var data = `{"username":"${process.env.ECRP_USER}","password":"${process.env.ECRP_PASSWORD}"}`;
  var token = "";
  var stocks;
  var counter = 0;
  console.log("Begin Updating stocks")
  // res.send(data);

  var config = {
    method: "post",
    url: "https://api.eclipse-rp.net/auth/login",
    headers: {
      Accept: "application/json, text/plain, */*",
      "User-Agent":
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/98.0.4758.87 Safari/537.36",
      "Content-Type": "application/json;charset=UTF-8",
      "Sec-GPC": "1",
      "Sec-Fetch-Site": "same-site",
      "Sec-Fetch-Mode": "cors",
      "Sec-Fetch-Dest": "empty",
    },
    data: data,
  };

  axios(config)
    .then(function (response) {
      token = response.data.token;
      // console.log(token);
      var config = {
        method: "get",
        url: "https://api.eclipse-rp.net/basic/vehicledealerships",
        headers: {
          Accept: "application/json, text/plain, */*",
          "User-Agent":
            "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/98.0.4758.87 Safari/537.36",
          token: token,
          "Sec-GPC": "1",
          "Sec-Fetch-Site": "same-site",
          "Sec-Fetch-Mode": "cors",
          "Sec-Fetch-Dest": "empty",
        },
      };
      axios(config)
        .then(function (response) {
          stocks = response.data.dealerships[2].VehicleStocks.map((doc) => ({
            ...doc.v,
          }));

          if (stocks.length != 0) {
            stocks.map((stock) => {
              connection.query(
                `UPDATE heroku_894cd5ce4010198.vehicles SET stock = ${stock.Stock}, store_price = ${stock.Price} WHERE (hash = ${stock.Vehicle})`,
                function (err, result, fields) {
                  if (err) throw err;

                  counter = counter + 1;
                  console.log(`Updating ${stock.Name}`);
                  console.log(counter + " record(s) updated");
  
                }
              );
            });
          }
        })

        .catch(function (error) {
          console.log(error);
        });
    })
    .catch(function (error) {
      console.log(error);
    });
});

app.listen(port, () => console.log("Listening on port " + port));
