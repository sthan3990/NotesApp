// load .env data into process.env
require('dotenv').config();

// Web server config
const sassMiddleware = require('./lib/sass-middleware');
const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
const cookieSession = require('cookie-session');
const axios = require('axios');


const PORT = process.env.PORT || 8080;
const app = express();

app.set('view engine', 'ejs');

// helmet for security
app.use(helmet({ contentSecurityPolicy: false }));


// Cookie Options
app.use(cookieSession({
  name: 'session',
  keys: ['key1', 'key2'],
  maxAge: 24 * 60 * 60 * 1000 // 24 hours
}));


// Load the logger first so all (static) HTTP requests are logged to STDOUT
// 'dev' = Concise output colored by response status for development use.
//         The :status token will be colored red for server error codes, yellow for client error codes, cyan for redirection codes, and uncolored for all other codes.
app.use(morgan('dev'));
app.use(express.urlencoded({ extended: true }));
app.use(
  '/styles',
  sassMiddleware({
    source: __dirname + '/styles',
    destination: __dirname + '/public/styles',
    isSass: false, // false => scss, true => sass
  })
);
app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


// Separated Routes for each Resource
// Note: Feel free to replace the example routes below with your own
const userApiRoutes = require('./routes/users-api');
const widgetApiRoutes = require('./routes/widgets-api');

const chatRoutes = require('./routes/chat');
const usersRoutes = require('./routes/users');

// Mount all resource routes
// Note: Feel free to replace the example routes below with your own
// Note: Endpoints that return data (eg. JSON) usually start with `/api`
app.use('/api/users', userApiRoutes);
app.use('/api/widgets', widgetApiRoutes);

app.use('/chat', chatRoutes);
app.use('/users', usersRoutes);

// Note: mount other resources here, using the same pattern above

// Home page
// Warning: avoid creating more routes in this file!
// Separate them into separate routes files (see above).

app.get('/', (req, res) => {
  res.render('index');
});

app.get('/login', (req, res) => {
  res.render('login');
});

app.get('/register', (req, res) => {
  res.render('register');
});

app.get('/category', (req, res) => {
  res.render('category');
});

app.get('/chat', (req, res) => {
  res.render('chat');
});

app.post('/api/openai', async (req, res) => {
  try {
    const userMessage = req.body.user;

    console.log(userMessage);

    const response = await axios.post(
      'https://api.openai.com/v1/chat/completions',
      {
        model: 'gpt-3.5-turbo',
        messages: [
          {
            role: 'system',
            content: "Hello! I'm your friendly librarian assistant here to help you. Please describe your task name, and will categorize it into one of the following categories: Buy(1), Watch(2), Read(3), or Production(4). If there's any ambiguity, I'll ask for clarification up to three times before making my best guess. Once the task fits into a single category, I must provide the task name plus a comma then the corresponding category number in a single line.",
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

    // Handle BUY response
    if (response.data.choices[0].message.role === 'system' && response.data.choices[0].message.content.includes('BUY')) {
      // Implement your SQL query to insert into the BUY table here
      // e.g., db.query('INSERT INTO BUY (message) VALUES (?)', responseData.choices[0].message.content);
    }

    // Handle BUY response
    if (response.data.choices[0].message.role === 'system' && response.data.choices[0].message.content.includes('WATCH')) {
      // Implement your SQL query to insert into the BUY table here
      // e.g., db.query('INSERT INTO BUY (message) VALUES (?)', responseData.choices[0].message.content);
    }

    const chatbotReply = response.data.choices[0].message.content;
    res.json({ user: userMessage, chatbot: chatbotReply });


  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Something went wrong.' });
  }
});


app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});
