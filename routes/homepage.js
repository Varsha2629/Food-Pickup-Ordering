const express = require('express');
const router  = express.Router();

module.exports = (db) => {

router.get("/menu", async (req, res) => {
  const templateVars = {
    items : await database.getAllMenuItems()
  }
  res.render('menu', templateVars);
  console.log(templateVars)
});

return router;
}
