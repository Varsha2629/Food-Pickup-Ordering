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
  res.render("register");
  console.log('you registered successfully');
});

//login
router.get("/login", (req, res) => {
  console.log('loginnnnnnn');
  res.render("login");
});
// logout
// router.get("/", (req, res) => {
//   console.log('logout');
//   res.clearCookie('');
//   res.redirect("/index");
// });

// router.post("/login", (req, res) => {
//     res.status(200)
//     console.log('login post');
//     res.render("login");
// });



return router;
}
