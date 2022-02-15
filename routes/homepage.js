const express = require('express');
const router  = express.Router();

module.exports = (db) => {

router.get("/", async (req, res) => {
  const templateVars = {
    items : await db.getAllMenuItems()
  }
  res.render('menu', templateVars);
});


return router;
}
