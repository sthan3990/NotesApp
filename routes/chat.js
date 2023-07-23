/*
 * All routes for User Data are defined here
 * Since this file is loaded in server.js into api/users,
 *   these routes are mounted onto /api/users
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const cors = require('cors');
const axios = require('axios');


// Importing and setting up the OpenAI API client
const { Configuration, OpenAIApi } = require("openai");

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

// Endpoint to handle chatbot requests
router.post('/api/chatbot', (req, res) => {
  const userMessage = req.body.userMessage;
  // Call your OpenAI chatbot API here or use the logic you have to generate the chatbot response.
  // For simplicity, we'll just echo the user message back as the bot response.
  const botResponse = userMessage;

  res.json({ botResponse });
});

router.get('/', (req, res) => {
  res.render('chat');
});

module.exports = router;
