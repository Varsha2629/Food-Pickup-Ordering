const express = require('express');
const router  = express.Router();
const database = require('../server/database.js')

module.exports = (db) => {


router.get("/", async (req, res) => {
  const { orderId } = req.session
  // console.log('req.session:', req.session)
  // console.log('orderId:', orderId)
  if (!orderId) {
    const orderItems = {}
  } else {
    const templateVars = {
    orderItems : await database.getOrderItems(orderId, db)
  }
  // console.log(await database.getOrderItems(orderId, db))
  res.render('cart', templateVars)
  }
})

router.post("/addItem/:itemId", async (req, res) => {
  const { orderId } = req.session
  const { itemId } = req.params
  if (!orderId) {
    const newOrder = await database.createOrderId(db)
    const response = await database.addToCart(newOrder.id ,itemId, db)
    req.session.orderId = newOrder.id
    // res.send({response})
    res.redirect('/cart')
  } else {
    const response = await database.addToCart(orderId ,itemId, db)
    // res.send({response})
    res.redirect('/cart')
  }
});

router.post("/removeAll/:itemId", async (req, res) => {
  const { orderId } = req.session
  const { itemId } = req.params
  await database.removeAllFromCart(itemId, orderId, db)
  res.redirect('/cart')
});

router.post("/removeOne/:itemId", async (req, res) => {
  const { orderId } = req.session
  const { itemId } = req.params
  await database.removeOneFromCart(itemId, orderId, db)
  res.redirect('/cart')
})

return router;
}
