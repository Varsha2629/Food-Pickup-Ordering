const express = require('express');
const router  = express.Router();
const database = require('../server/database.js')

module.exports = (db) => {

router.get("/", async (req, res) => {
  const templateVars = {
    items : await database.getAllMenuItems(db)
  }
<<<<<<< HEAD
  res.render("menu", templateVars);

=======
  console.log(templateVars)
  res.render('menu', templateVars);
>>>>>>> 4dd5b7987682525186ab43cca3628de414d2960d
});


return router;
}
