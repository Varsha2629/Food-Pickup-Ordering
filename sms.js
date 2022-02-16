const accountSid = 'AC902fa4347ec892ab40f1ecc36e04722b';
const authToken = '[AuthToken]';
const client = require('twilio')(accountSid, authToken);

client.messages
      .create({
         to: '+14164204433'
       })
      .then(message => console.log(message.sid))
      .done();
