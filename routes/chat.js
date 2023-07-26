/*
 * All routes for User Data are defined here
 * Since this file is loaded in server.js into api/users,
 *   these routes are mounted onto /api/users
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require('express');
const router = express.Router();
const axios = require('axios');
const insertTask = require('../db/queries/tasks');

router.get('/', (req, res) => {
  res.render('chat');
});

router.post('/', async (req, res) => {
  try {
    const userMessage = req.body.user;

    const response = await axios.post(
      'https://api.openai.com/v1/chat/completions',
      {
        model: 'gpt-3.5-turbo',
        messages: [
          {
            role: 'system',
            content: "Hello! I'm your friendly librarian assistant here to help you. Please describe your task name, and will categorize it into one of the following categories: Eat (1), Watch (2), Read (3), Buy (4), Do (5) and Other (6). If there's any ambiguity, I'll ask for clarification up to three times before making my best guess and choosing the Other category. Once the task fits into a single category, I will provide the task name a comma then the corresponding category number in a single line.",
          },
          {
            role: 'user',
            content: userMessage,
          },
        ],
      },
      {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
        },
      }
    );

    res.json(response.data);

    // Handle EAT response
    if (response.data.choices[0].message.role === 'system' && response.data.choices[0].message.content.includes('EAT')) {
      insertTask("EAT", userMessage);
    }

    // Handle WATCH response
    else if (response.data.choices[0].message.role === 'system' && response.data.choices[0].message.content.includes('WATCH')) {
      insertTask("WATCH", userMessage);

    }

    // Handle READ response
    else if (response.data.choices[0].message.role === 'system' && response.data.choices[0].message.content.includes('READ')) {
      insertTask("READ", userMessage);

    }

    // Handle BUY response
    else if (response.data.choices[0].message.role === 'system' && response.data.choices[0].message.content.includes('BUY')) {
      insertTask("BUY", userMessage);

    }

    // Handle DO response
    else if (response.data.choices[0].message.role === 'system' && response.data.choices[0].message.content.includes('DO')) {
      insertTask("DO", userMessage);

    }

    // Handle OTHER  response
    else if (response.data.choices[0].message.role === 'system' && response.data.choices[0].message.content.includes('OTHER')) {
      insertTask("OTHER", userMessage);
    }


  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Something went wrong.' });
  }
});

module.exports = router;
