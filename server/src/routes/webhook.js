// server/routes/webhook.js
const express = require('express');
const router = express.Router();

// Webhook Doğrulama
router.get('/', (req, res) => {
  const VERIFY_TOKEN = process.env.VERIFY_TOKEN;

  const mode = req.query['hub.mode'];
  const token = req.query['hub.verify_token'];
  const challenge = req.query['hub.challenge'];

  if (mode && token) {
    if (mode === 'subscribe' && token === VERIFY_TOKEN) {
      console.log('WEBHOOK_VERIFIED');
      res.status(200).send(challenge);
    } else {
      res.sendStatus(403);
    }
  }
});

// Webhook Mesajları Alma
router.post('/', (req, res) => {
  const body = req.body;

  // Burada gelen webhook verisini işleyebilirsiniz
  console.log('Received webhook:', JSON.stringify(body, null, 2));

  res.status(200).send('EVENT_RECEIVED');
});

module.exports = router;
