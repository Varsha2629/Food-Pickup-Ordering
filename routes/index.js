const database = require('../server/database.js')
const express = require('express');
const router  = express.Router();

// import { getAllMenuItems } from('../server/database.js')

module.exports = (db) => {
// home
router.get("/", (req, res) => {
  // console.log('This is home');
  res.render("index");
});

//register
router.get("/register", (req, res) => {
<<<<<<< HEAD

  const templateVars = {
    user: null
  }
  res.render("register", templateVars);
=======
  res.render("register");
  // console.log('you registered successfully');
>>>>>>> f5c61645e5606aa39c7e00e6576c4cf88eacd5b5
});

//login
router.get("/login", (req, res) => {
<<<<<<< HEAD

=======
  // console.log('loginnnnnnn');
>>>>>>> f5c61645e5606aa39c7e00e6576c4cf88eacd5b5
  res.render("login");
});
// logout
router.post("/logout", (req, res) => {
  req.session = null;
  res.redirect('/login')
});

// router.post("/login", (req, res) => {
//     res.status(200)
//     console.log('login post');
//     res.render("login");
// });

<<<<<<< HEAD
=======
router.get("/menu", (req, res) => {
  const menuItems = database.getAllMenuItems()
  const templateVars = {
    itmes : database.getAllMenuItems()
  }
  res.render('menu', database.getAllMenuItems());
  // console.log(database.getAllMenuItems())
});

>>>>>>> f5c61645e5606aa39c7e00e6576c4cf88eacd5b5
return router;
}
