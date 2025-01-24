// server/routes/auth.js
const express = require('express');
const axios = require('axios');
const router = express.Router();

// Middleware for verifying access token
const verifyToken = (req, res, next) => {
  const bearerHeader = req.headers['authorization'];
  if (typeof bearerHeader !== 'undefined') {
    const token = bearerHeader.split(' ')[1];
    req.token = token;
    next();
  } else {
    res.sendStatus(403);
  }
};

// Instagram OAuth Login URL
router.get('/login', (req, res) => {
  const authURL = `https://api.instagram.com/oauth/authorize?client_id=${process.env.INSTAGRAM_APP_ID}&redirect_uri=${process.env.INSTAGRAM_REDIRECT_URI}&scope=instagram_basic,instagram_manage_messages&response_type=code`;
  res.redirect(authURL);
});

// OAuth Callback
router.get('/callback', async (req, res) => {
  const { code } = req.query;

  try {
    // Exchange code for access token
    const tokenResponse = await axios.post(
      `https://api.instagram.com/oauth/access_token`,
      null,
      {
        params: {
          client_id: process.env.INSTAGRAM_APP_ID,
          client_secret: process.env.INSTAGRAM_APP_SECRET,
          grant_type: 'authorization_code',
          redirect_uri: process.env.INSTAGRAM_REDIRECT_URI,
          code,
        },
      }
    );

    const accessToken = tokenResponse.data.access_token;
    const userID = tokenResponse.data.user_id;

    // TODO: Store accessToken and userID securely (e.g., in a database)

    // Redirect to frontend with access token
    res.redirect(`${process.env.FRONTEND_URL}/dashboard?access_token=${accessToken}`);
  } catch (error) {
    console.error('Error exchanging code for token:', error.response.data);
    res.status(500).send('Authentication failed');
  }
});

// Endpoint to get Instagram data
router.get('/instagram-data', verifyToken, async (req, res) => {
  const token = req.token;

  try {
    const response = await axios.get(`https://graph.instagram.com/me?fields=id,username&access_token=${token}`);
    res.json(response.data);
  } catch (error) {
    console.error('Error fetching Instagram data:', error.response.data);
    res.status(500).send('Failed to fetch Instagram data');
  }
});

// Endpoint to get DM messages
router.get('/dm-messages', verifyToken, async (req, res) => {
  const token = req.token;

  try {
    const response = await axios.get(`https://graph.instagram.com/me/messages?access_token=${token}`);
    res.json(response.data.data);
  } catch (error) {
    console.error('Error fetching DM messages:', error.response.data);
    res.status(500).send('Failed to fetch DM messages');
  }
});

module.exports = router;
