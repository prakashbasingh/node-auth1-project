const express = require("express");
const helmet = require("helmet");
const morgan = require("morgan");
const cors = require("cors");

const bcryptjs = require("bcryptjs");
const session = require("express-session");
const KnexSessionStore = require("connect-session-knex")(session);


const usersRouter = require("../users/users-router.js")
const authRouter = require("../auth/auth-router.js")
const dbConnection = require("../database/connection.js");
const authenticate = require("../auth/authenticate-middleware.js");


const server = express();

const sessionConfiguration = {
  name: "monster", // name has default value of sid
  secret: process.env.SESSION_SECRET || "keep it secret, keep it safe!", //this is the key to create encrypted value
  cookie: {
      maxAge: 1000 * 60 * 10, //this will set time for cookie life here 10 min //session expiration
      secure: process.env.USE_SECURE_COOKIES || false, // send the cookie only over https (secure connections), true in production
      httpOnly: true, // prevent JS code on client from accessing this cookie // true means client JS can not access this cookie
  },
  resave: false,
  saveUninitialized: true, // read docs, it's related to GDPR compliance
  store: new KnexSessionStore({
      knex: dbConnection,
      tablename: "sessions",
      sidfieldname: "sid",
      createtable: true,
      clearInterval: 1000 * 60 * 30, // time to check and remove expired sessions from database
  }),
};

server.use(session(sessionConfiguration)); // enables session support
server.use(helmet());
server.use(express.json());
server.use(morgan("dev"));
server.use(cors());

server.use("/api/users",authenticate, usersRouter)
server.use("/api/auth", authRouter)

server.get("/", (req, res) => {
    res.json({ api: "This is day 1 of 3rd week BackEnd session _--_--_ server is UP and running" });
  });

 module.exports = server;
