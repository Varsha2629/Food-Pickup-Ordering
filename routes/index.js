const database = require('../server/database.js')
const express = require('express');
const router  = express.Router();


module.exports = (db) => {
// home
router.get("/", (req, res) => {
  console.log('This is home');
  res.render("index");
});

//register
router.get("/register", (req, res) => {

  const templateVars = {
    user: null
  }
  res.render("register", templateVars);
});

//login
router.get("/login", (req, res) => {

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

return router;
}
