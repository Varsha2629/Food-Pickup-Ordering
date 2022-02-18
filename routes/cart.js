const express = require("express");
const router = express.Router();
const database = require("../server/database.js");
const {  orderCompleted, orderConfirmed, timeConfirmed } = require("../server/twilio_sms.js");

module.exports = (db) => {
  router.get("/", async (req, res) => {
    const { orderId } = req.session
    // console.log('req.session:', req.session)
     console.log('orderId:', orderId)
    if (!orderId) {
      const orderItems = {}
      res.redirect('/')
    } else {
      const templateVars = {
      orderItems : await database.getOrderItems(orderId, db),
      totalPrice : await database.getTotalPrice(orderId, db),
      oderId: orderId
    }
    // console.log(templateVars)
    res.render('cart', templateVars)
    }
  });

  router.post("/addItem/:itemId", async (req, res) => {
    const { orderId } = req.session;
    const { itemId } = req.params;
    // console.log("from addOne: " + orderId);
    if (!orderId) {
      const newOrder = await database.createOrderId(db);
      const response = await database.addToCart(newOrder.id, itemId, db);
      req.session.orderId = newOrder.id;
      // res.send({response})
      res.redirect("/cart");
    } else {
      const response = await database.addToCart(orderId, itemId, db);
      // res.send({response})
      res.redirect("/cart");
    }
  });

  router.post("/removeAll/:itemId", async (req, res) => {
    const { orderId } = req.session;
    const { itemId } = req.params;
    await database.removeAllFromCart(itemId, orderId, db);
    res.redirect("/cart");
  });

  router.post("/removeOne/:itemId", async (req, res) => {
    const { orderId } = req.session;
    const { itemId } = req.params;

    console.log("from removeOne: " + orderId);
    await database.removeOneFromCart(itemId, orderId, db);
    res.redirect("/cart");
  });

  router.post("/sendSMS", async (req, res) => {
    const { orderId }  = req.session;
    //console.log("from sendSMS: " + orderId);
    // timeConfirmed();
    //  orderConfirmed();
    const result = await database.placeOrder(db, orderId, true);
      if (result === 1) {
      await database.deleteFromOrderItemsIfOrderIsPlaced(db, orderId);
      orderConfirmed(orderId);
      req.session = null
    }
    res.json({ status: "okkkkk" });
  });

  router.post("/confirm_order", (req, res) => {

    timeConfirmed(req.body.time_est);
    res.send(req.body.time_est);
  });

  router.post("/completed", async (req, res) => {
    // const { orderId } = req.session;
    const orderId = req.body.orderId;
    const result = await database.completedOrder(db, orderId, true);
    orderCompleted(orderId);

    res.json({ status: "okkkkk" });
  });


// OrderPlaced
router.get("/:id", async (req, res) => {
  const orderId = req.params.id
  const orderData = await database.getOrderById(orderId, db)
  console.log('orderData')
  console.log(orderData)
  // res.render('orderPlaced',{ orderId: orderId } );


  if(orderData.order_ready){
      res.render('completedOrder');
  } else {
    res.render('orderPlaced',{ orderId: orderId });
  }
})

  return router;
};
