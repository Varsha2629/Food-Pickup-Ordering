const express = require('express');
const router  = express.Router();
const database = require('../server/database.js')

module.exports = (db) => {

router.get("/:id", async (req, res) => {
  const templateVars = {
   items: await database.getAllOrderItems(db, req.params.id)
  }
  res.render("cart", templateVars);

});

return router;
}
