const database = require('../server/database.js')
const express = require('express');
const router = express.Router();

module.exports = (db) => {
  // home
  router.get("/", (req, res) => {
    res.render("index");
  });
  //login
  router.get("/login", (req, res) => {
    // console.log('loginnnnnnn');
    res.render("login");
  });

  router.post("/login", (req, res) => {

    res.redirect("/");
  });
  return router;
};
