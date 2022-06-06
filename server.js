const express = require("express");
const path = require("path");
const nodemailer = require("nodemailer");
const bodyparser = require("body-parser");
var SibApiV3Sdk = require("sib-api-v3-sdk");
require("dotenv/config");
const app = express();

const Port = process.env.PORT || 3002;
const SIBAPI_key = process.env.SIBAPI_key;

var jsonParser = bodyparser.json();
var urlParser = bodyparser.urlencoded({ extended: false });
// constants
var public = path.join(__dirname, "/public");

app.use(express.static(public));
// GET Request
app.get("/", (req, res) => {
  res.sendFile(public + "/index.html");
});
app.get("/about", (req, res) => {
  res.sendFile(public + "/html/about.html");
});
app.get("/favicon", (req, res) => {
  res.sendFile(public + "/img/logo/jumoh.ico");
});
app.get("/teach", (req, res) => {
  res.sendFile(public + "/html/teach.html");
});
app.get("/singlecourse/:id", (req, res) => {
  var id = req.params.id;
  res.sendFile(public + "/html/" + id + ".html");
});

app.post("/teach", jsonParser, (req, res) => {
  var data = req.body;
  if (data) {
    const transport = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "ifotim21@gmail.com",
        pass: `${process.env.Email_Password}`,
      },
      tls: {
        rejectUnauthorized: false,
      },
    });
    var options = {
      from: "ifotim21@gmail.com",
      to: "careers@jumoh.com ",
      subject: "Jumoh New Tutor Application ",
      //{ name: 'hi', phone: '090', email: 'hi@gmail.com', course: 'hi' }
      text: `name:${data.name}, phone Number:${data.phone}, email:${data.email}, course:${data.course} `,
      html: `<p><b>name</b>  :${data.name}, </p><p><b>phone Number</b> :${data.phone},</p><p> <b>email</b>  : ${data.email},</p><p><b> course</b> :${data.course} </p>`,
    };

    transport.sendMail(options, (err, info) => {
      if (err) {
        console.error(err);
        res.json({
          message: "An error occured pls contact help@jumoh.com",
          status: 501,
        });
        return;
      }
      // console.log(info)
      res.json({
        message:
          "Your application has been Received, We will contact you soonest",
        status: 200,
      });
    });
  }
});

app.post("/enroll", jsonParser, (req, res) => {
  var defaultClient = SibApiV3Sdk.ApiClient.instance;
  async function enroll() {
    let apiKey = defaultClient.authentications["api-key"];
    apiKey.apiKey = SIBAPI_key;

    var apiInstance = new SibApiV3Sdk.ContactsApi();

    var createContact = new SibApiV3Sdk.CreateContact();

    createContact = {
      email: req.body.email,
      attributes: {
        SMS: req.body.number,
        FIRSTNAME: req.body.name.split(" ")[0],
        LASTNAME: req.body.name.split(" ")[1],
      },
      listIds: [req.body.id],
      emailBlacklisted: false,
      smsBlacklisted: false,
      updateEnabled: false,
    };

    apiInstance.createContact(createContact).then(
      function (data) {
        console.log(
          "API called successfully. Returned data: " + JSON.stringify(data)
        );
        let listId = [parseInt(req.body.id)];

        let contactEmails = new SibApiV3Sdk.AddContactToList();

        contactEmails.emails = [req.body.email];

        apiInstance.addContactToList(listId, contactEmails).then(
          function (data) {
            console.log(
              "API called successfully. Returned data: " + JSON.stringify(data)
            );
            res.json({ message: "enrollment request received ", status: 200 });
          },
          function (error) {
            console.error(error.response.body);
            res.json({ message: error.response.body.message, status: 501 });
          }
        );
      },
      function (error) {
        console.error(error.response.body);
        res.json({ message: error.response.body.message, status: 501 });
      }
    );
  }
  if (req.body.name.split(" ")[1]) {
    enroll();
  }
});

app.listen(Port, () => {
  console.log("ifotim");
});
