
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken =  process.env.TWILIO_AUTH_TOKEN;
const twilioClient = require("twilio")(accountSid, authToken);

const orderConfirmed = function (orderId) {

  twilioClient.messages
    .create({
      body: `http://localhost:8080/cart/${orderId}`,
      from: +19146858773,
      to: +15147060363,
    })
    .then((message) => console.log(message.sid));
};

const timeConfirmed = function (time) {
  twilioClient.messages
    .create({
      body: `Your order has been confirmed. It will be ready in approximately ${time} minutes.`,
      from: +19146858773,
      to: +15147060363,
    })
    .then((message) => console.log(message.sid));
};

const orderCompleted = function () {
  twilioClient.messages
    .create({
      body: `Your order is completed! 😊`,
      from: +19146858773,
      to: +15147060363,
    })
    .then((message) => console.log(message.sid));
};

module.exports = { orderConfirmed, timeConfirmed, orderCompleted };
