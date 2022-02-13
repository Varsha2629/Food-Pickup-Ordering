const express = require('express');
const router  = express.Router();


module.exports = (db) => {

router.get("/menu", (req, res) => {
  console.log('This is menu');
  res.render("menu");
});

return router;
}
