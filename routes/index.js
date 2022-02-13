const express = require('express');
const router  = express.Router();


module.exports = (db) => {
// home
router.get("/", (req, res) => {
  console.log('This is home');
  res.render("index");
});

//login
router.get("/login", (req, res) => {
  console.log('loginnnnnnn');
  res.render("index");
});
// logout
router.get("/", (req, res) => {
  console.log('logout');
  res.clearCookie('user');
  res.redirect("/");
});

// router.post("/login", (req, res) => {
//     res.status(200)
//     console.log('login post');
//     res.render("login");
// });

//register
router.get("/register", (req, res) => {
  res.render("index");
  console.log('you registered successfully');
});

return router;
}
