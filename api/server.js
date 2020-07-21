const express = require("express");
const helmet = require("helmet");
const morgan = require("morgan");

const cors = require("cors");


const server = express();


server.use(helmet());
server.use(express.json());
server.use(morgan("dev"));
server.use(cors());


server.get("/", (req, res) => {
    res.json({ api: "This is day 1 of 3rd week BackEnd session _--_--_ server is UP and running" });
  });


  module.exports = server;
