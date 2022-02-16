const accountSid = 'AC902fa4347ec892ab40f1ecc36e04722b';
const authToken = '[AuthToken]';
const client = require('twilio')(accountSid, authToken);

client.messages
      .create({
         body: 'Your order is ready for pick-up!',
         messagingServiceSid: 'MGdcbeab9417496c80248a029666e20b2f',
         to: '+14164204433'
       })
      .then(message => console.log(message.sid))
      .done();
