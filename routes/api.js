const express = require("express");
const axios = require('axios');
const router = express.Router();

const email_controller = require("../controller/emailController");
const spam_controller = require("../controller/spamController");


router.post("/email/create", email_controller.email_create);

router.post("/email/:id/delete", email_controller.email_delete);

router.post("/email/delete", email_controller.email_delete_email);

router.post("/email/:id/update", email_controller.email_update);

router.post("/email/update/:email", email_controller.email_update_email);

router.get("/email/:id", email_controller.email_detail);

router.get("/emails", email_controller.emails_list);

router.post("/spam/create", spam_controller.spam_create);

router.post("/spam/:id/delete", spam_controller.spam_delete);

router.post("/spam/:id/update", spam_controller.spam_update);

router.get("/spam/:id", spam_controller.spam_detail);

router.get("/spams", spam_controller.spams_list);

router.post('/sendemail', function (req, res) {
    const {name, email, subject, message} = req.body;
    sendEmail(name, email, subject, message);
  });

async function sendEmail(name, email, subject, message) {
    const data = JSON.stringify({
      "Messages": [{
        "From": {"Email": "belokonegor2000@gmail.com", "Name": "Yehor"},
        "To": [{"Email": email, "Name": name}],
        "Subject": subject,
        "TextPart": message
      }]
    });
  
    const config = {
      method: 'post',
      url: 'https://api.mailjet.com/v3.1/send',
      data: data,
      headers: {'Content-Type': 'application/json'},
      auth: {username: '03f6a1070bc9044dc1a0a497da35cd5b', password: '1ae655d07e4d84512e145b82b97e960b'},
    };
  
    return axios(config)
      .then(function (response) {
        console.log(JSON.stringify(response.data));
      })
      .catch(function (error) {
        console.log(error);
      });
  
  }

module.exports = router;