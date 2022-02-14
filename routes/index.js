const express = require('express');
const router = express.Router();
const database = require('../server/database.js')
const { generateRandomString, getUserByEmail } = require('../server/helpers');


// import { getAllMenuItems } from('../server/database.js')

module.exports = (d) => {
  // home
  router.get("/", (req, res) => {
    // console.log('This is home');
    res.render("index");
  });

  //register
  router.get("/register", (req, res) => {
    const templateVars = {
      user: null
    }
    res.render("register", templateVars);

  });

  router.post("/register", (req, res) => {
    const userEmail = req.body.email;
    const userPass = req.body.password;
    const id = generateRandomString()

    const user = {
      id,
      email: userEmail,
      password: userPass

    }
    if (userEmail === '' || userPass === '') {
      res.status(400).send('email and password can not be empty');
      return
    }
    if (getUserByEmail(userEmail, user)) {
      res.status(400).send('email already exits!')
    }
    console.log('you registered successfully');

    res.redirect("/login")
  });


  //login
  router.get("/login", (req, res) => {
    res.render("login");
  });

  router.post("/login", (req, res) => {
    const userEmail = req.body.email;
    const userPass = req.body.password;
    const user = getUserByEmail(userEmail, database.users)

    res.redirect("/");
  });

  // logout
  router.post("/logout", (req, res) => {
    // req.session = null;
    res.redirect('/login')
  });

  router.get("/menu", (req, res) => {
    const menuItems = database.getAllMenuItems()
    const templateVars = {
      itmes: database.getAllMenuItems()
    }
    res.render('menu', templateVars);
    // console.log(database.getAllMenuItems())
  });

  return router;
}
