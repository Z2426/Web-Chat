var config = require("config");
const Vonage = require('@vonage/server-sdk');

const vonage = new Vonage({
    apiKey: config.get("vonage.apiKey"),
    apiSecret: config.get("vonage.apiSecret")
  });

function getRandomInt() {
    return Math.floor(Math.random() * (9999 - 1000)) + 1000;
};

function sms(from,to,text){ 
    vonage.message.sendSms(from, to, text, (err, responseData) => {
      if (err) {
          console.log(err);
      } else {
          if(responseData.messages[0]['status'] === "0") {
              console.log("Message sent successfully.");
          } else {
              console.log(`Message failed with error: ${responseData.messages[0]['error-text']}`);
          }
      }
})};

module.exports = {
    sms:sms,
    getRandomInt: getRandomInt
};

