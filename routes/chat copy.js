/*
 * All routes for User Data are defined here
 * Since this file is loaded in server.js into api/users,
 *   these routes are mounted onto /api/users
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require('express');
const router = express.Router();
const openAI = require("openai");
const fetch = require("node-fetch");

// Importing and setting up the OpenAI API client
const { Configuration, OpenAIApi } = require("openai");
const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

router.post('/chat', async (req, res) => {

  // Defining a conversation context prompt
  let conversationMessages =
    [
      {
        "role": "system",
        "content": "Hello! I'm your friendly librarian assistant here to help you. Please describe your task name, and will categorize it into one of the following categories: Buy(1), Watch(2), Read(3), or Production(4). If there's any ambiguity, I'll ask for clarification up to three times before making my best guess. Once the task fits into a single category, I must provide the task name plus a comma then the corresponding category number in a single line."
      },
    ];

  let { message } = req.body;

  // store user message in global message state
  let userMessage =
  {
    role: "user",
    content: message
  };

  conversationMessages.push(userMessage);

  // send a request to the OpenAI API with the user's prompt
  // DOCUMENTATION: https://platform.openai.com/docs/api-reference/chat
  const response = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
    },

    // construct the request payload
    // using the entire chat history (conversationMessages)
    // sending an external request to the OpenAI API
    body: JSON.stringify({
      model: 'gpt-3.5-turbo',
      // What sampling temperature to use, between 0 and 2. Higher values like
      // 0.8 will make the output more random, while lower values like 0.2 will
      // make it more focused and deterministic.
      temperature: '0.5',
      messages: conversationMessages,
      // The maximum number of tokens to generate in the chat completion.
      // The total length of input tokens and generated tokens is limited by
      // the model's context length.
      max_tokens: 100,
    }),
  });

  console.log(response);

  // parse the response from OpenAI as json
  const data = await response.json();

  console.log(data);

  // get the bot's answer from the OpenAI API response
  const botAnswer = data.choices[0].message.content;

  // create the bot message object
  const botMessage =
  {
    role: "assistant",
    content: botAnswer
  };

  // store bot message in global message state
  conversationMessages.push(botMessage);

  // send the bot's answer back to the client
  return res.json({ status: 'success', data: botAnswer });

});

router.get('/', (req, res) => {
  res.render('chat');
});

module.exports = router;
