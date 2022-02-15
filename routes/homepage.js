const express = require('express');
const router  = express.Router();
const database = require('../server/database.js')

module.exports = (db) => {

router.get("/", async (req, res) => {
  const templateVars = {
    items : await database.getAllMenuItems(db)
  }
  res.render('menu', templateVars);
});


return router;
}
