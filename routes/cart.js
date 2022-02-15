const express = require('express');
const router  = express.Router();
const database = require('../server/database.js')

module.exports = (db) => {
router.get("/", async (req, res) => {
  console.log('non')
  const { orderId } = req.session
  console.log('req.session:', req.session)
  console.log('orderId:', orderId)
  if (!orderId) {
    const orderItems = {}
  } else {
    const templateVars = {
    orderItems : await database.getOrderItems(orderId, db)
  }
  res.render('cart')
  }
})

router.post("/addItem/:itemId", async (req, res) => {
  const { orderId } = req.session
  if (!orderId) {
    const newOrder = await database.createOrderId(db)
    const { itemId } = req.params
    const response = await database.addToCart(newOrder.id ,itemId, db)
    req.session.orderId = newOrder.id
    // res.send({response})
    console.log('abc')
    return res.redirect('/cart')
    console.log('def')
  } else {
    const { itemId } = req.params
    const response = await database.addToCart(orderId ,itemId, db)
    // res.send({response})
    console.log('xyz')
    res.redirect('/cart')
    console.log('123')
  }
});

return router;
}
