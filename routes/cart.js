const express = require('express');
const router = express.Router();
const database = require('../server/database.js')

module.exports = (db) => {
  router.get("/", async (req, res) => {
    const { orderId } = req.session
    console.log('req.session:', req.session)
    console.log('orderId:', orderId)
    if (!orderId) {
      const orderItems = {}
    } else {
      const templateVars = {
        orderItems: await database.getOrderItems(db, orderId)
      }
      console.log(await database.getOrderItems(db, orderId))
      res.render('cart', templateVars)
    }
  })

  router.post("/addItem/:itemId", async (req, res) => {
    const { orderId } = req.session
    if (!orderId) {
      const newOrder = await database.createOrderId(db)
      const { itemId } = req.params
      const response = await database.addToCart(db, newOrder.id, itemId)
      req.session.orderId = newOrder.id
      // res.send({response})
      res.redirect('/cart')
    } else {
      const { itemId } = req.params
      const response = await database.addToCart(db, orderId, itemId)
      // res.send({response})
      res.redirect('/cart')
    }
  });

  return router;
}
