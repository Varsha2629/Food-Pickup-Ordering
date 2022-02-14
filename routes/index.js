const express = require('express');

const router = express.Router();
const bcrypt = require('bcrypt');

router.use(express.urlencoded({ extended: true }));

module.exports = (pool) => {
  // home
  router.get("/", (req, res) => {
    // console.log('This is home');
    res.render("index");
  });


  //login
  router.get("/login", (req, res) => {

    res.redirect("/")
  });

  // router.get("/login/:id", (req, res) => {
  //   const templateVars = {
  //     //  set user to null
  //     user: null
  //   }
  //   res.redirect("/:id", templateVars)
  // });


  router.post("/login", (req, res) => {

  });

  return router;
}
