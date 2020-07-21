const express = require("express");
const helmet = require("helmet");
const morgan = require("morgan");
const cors = require("cors");

const bcryptjs = require("bcryptjs");
// const session = require("express-session");
// const KnexSessionStore = require("connect-session-knex")(session);


const usersRouter = require("../users/users-router.js")
const authRouter = require("../auth/auth-router.js")
// const dbConnection = require("../database/connection.js");
// const authenticate = require("../auth/authenticate-middleware.js");


const server = express();


server.use(helmet());
server.use(express.json());
server.use(morgan("dev"));
server.use(cors());

server.use("/api/users", usersRouter)
server.use("/api/auth", authRouter)

server.get("/", (req, res) => {
    res.json({ api: "This is day 1 of 3rd week BackEnd session _--_--_ server is UP and running" });
  });

 module.exports = server;
