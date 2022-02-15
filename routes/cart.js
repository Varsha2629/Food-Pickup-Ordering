const express = require('express');
const router  = express.Router();
const database = require('../server/database.js')

module.exports = (db) => {
router.get("/", async (req, res) => {
  // const templateVars;
  res.render('cart');
});

router.post("/addItem/:itemId", async (req, res) => {
  const { orderId } = req.session
  if (!orderId) {
    const newOrder = await database.createOrderId(db)
    const { itemId } = req.params
    const response = await database.addToCart(newOrder.id ,itemId, db)
    req.session.oderId = newOrder.id
    // res.send({response})
    res.redirect('/cart')

  } else {
    const { itemId } = req.params
    const response = await database.addToCart(orderId ,itemId, db)
    // res.send({response})
    res.redirect('/cart')
  }
  
  // const { itemId } = req.params
  // const response = await database.addToCart(orderId ,itemId, db)
  // res.send({response})
});

return router;
}
