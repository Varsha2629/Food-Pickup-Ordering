const express = require('express');
const router  = express.Router();
const database = require('../server/database.js')

module.exports = (db) => {

router.get("/menu", async (req, res) => {
  const templateVars = {
    items : await database.getAllMenuItems()
  }
  res.render('menu', templateVars);
  console.log('THESE ARE THR VARIABLES', templateVars)
});

return router;
}
