const express = require("express");
const router = express.Router();
const database = require("../server/database.js");
const {  orderCompleted, orderConfirmed, timeConfirmed } = require("../server/twilio_sms.js");

module.exports = (db) => {
  router.get("/", async (req, res) => {
    const { orderId } = req.session;
    // console.log('req.session:', req.session)
    // console.log('orderId:', orderId)
    if (!orderId) {
      const orderItems = {};
    } else {
      const templateVars = {
        orderItems: await database.getAllMenuItems(orderId, db),
        totalPrice: await database.getTotalPrice(orderId, db)
      };
      // console.log(await database.getOrderItems(orderId, db))
      res.render("cart", templateVars);
    }
  });

  router.post("/addItem/:itemId", async (req, res) => {
    const { orderId } = req.session;
    const { itemId } = req.params;
    console.log("from addOne: " + orderId);
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
    const { orderId } = req.session;
    console.log("from sendSMS: " + orderId);
    // timeConfirmed();
    //  orderConfirmed();
    const result = await database.placeOrder(db, orderId, true);
    //  console.log(result);
    if (result === 1) {
      await database.deleteFromOrderItemsIfOrderIsPlaced(db, orderId);
      orderConfirmed(); //ques i got undefinde here Why?
    }
    res.json({ status: "okkkkk" });
  });

  router.post("/confirm_order", (req, res) => {
    console.log(req.body);
    timeConfirmed(req.body.time_est); //ques
    res.send(req.body.time_est);
  });

  router.post("/completed", async (req, res) => {
    const { orderId } = req.session;
    const result = await database.completedOrder(db, orderId, true);
    orderCompleted();

    res.json({ status: "okkkkk" });
  });

  return router;
};
