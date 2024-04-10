const express = require("express");
const nodemailer = require("nodemailer");
const { createPool } = require("mysql");
var bodyParser = require("body-parser");
require("dotenv").config();
const cors = require("cors");

const app = express();
app.use(cors());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

let config = {
  host: "smtp.gmail.com",
  port: 587,
  auth: {
    user: "dev.ashwinalexander@gmail.com",
    pass: "fsqxginpqingrcnn",
  },
};

let transporter = nodemailer.createTransport(config);
transporter.verify().then(console.log).catch(console.error);

const pool = createPool({
  host: "localhost",
  user: "root",
  password: "Root@123",
  database: "userdata",
  connectionLimit: 10,
});

app.get("/", (re, res) => {
  return res.json("From BAckend Side");
});

app.get("/users", (req, res) => {
  const sql = "SELECT * FROM users";
  pool.query(sql, (err, data) => {
    if (err) return res.json(err);
    return res.json(data);
  });
});

app.post("/saveuser", (req, res) => {
  console.log(req.body);
  const sql =
    "insert into users (username,email,verify) values ('" +
    req.body.username +
    "','" +
    req.body.email +
    "',false);";
  console.log(sql);
  pool.query(sql, (err, data) => {
    if (err) return res.json(err);
    return res.json(data);
  });
});

app.post("/verifyuser", (req, res) => {
  console.log(req.body);
  const sql =
    "Update users set verify = true where userid = " + req.body.userid + ";";
  pool.query(sql, (err, data) => {
    if (err) {
      return res.json(err);
    } else {
      let message = {
        from: "dev.ashwinalexander@gmail.com", // sender address
        to: req.body.email, // list of receivers
        subject: "Welcome to ABC Website!", // Subject line
        html: "<b>Your Email is Verified !!!</b>", // html body
      };
      transporter
        .sendMail(message)
        .then((info) => {
          return res.status(201).json({
            msg: "Email sent",
            info: info.messageId,
            preview: nodemailer.getTestMessageUrl(info),
          });
        })
        .catch((err) => {
          return res.status(500).json({ msg: err });
        });
    }
  });
});

app.listen(8081, () => {
  console.log("listening");
});
