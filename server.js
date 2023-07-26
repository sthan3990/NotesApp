// load .env data into process.env
require('dotenv').config();

// Web server config
const sassMiddleware = require('./lib/sass-middleware');
const express = require('express');
const morgan = require('morgan');
const cookieSession = require('cookie-session');
const helmet = require('helmet');
const axios = require('axios');

// User Made Functions
const insertTask = require('./db/queries/tasks');
const {updateuserProfile} = require('./db/queries/profile');

const PORT = process.env.PORT || 8080;
const app = express();

const db  = require('./db/connection');
db.connect();

app.set('view engine', 'ejs');

// helmet for security
app.use(helmet());


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
app.use(cookieSession({
  name: 'session',
  keys: ['key1', 'key2']
}));
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
const authRoutes = require('./routes/auth');
const profileRoutes = require('./routes/profile');
const registerRoutes = require('./routes/register');
const loginRoutes = require('./routes/login');

// Mount all resource routes
// Note: Feel free to replace the example routes below with your own
// Note: Endpoints that return data (eg. JSON) usually start with `/api`
app.use('/api/users', userApiRoutes);
app.use('/api/widgets', widgetApiRoutes);

app.use('/chat', chatRoutes);
app.use('/users', usersRoutes);

app.use('/auth',authRoutes);
app.use('/profile', profileRoutes);

// Note: mount other resources here, using the same pattern above

// Home page
// Warning: avoid creating more routes in this file!
// Separate them into separate routes files (see above).

app.get('/', (req, res) => {
  res.render('index');
});

app.get('/login', (req, res) => {
  if (req.session.user_id) {
    res.redirect('/items');

  } else {
    let templateVars = {
      user: {id: undefined, name: null}
    };
    res.render('login', templateVars);
  }
});

app.get('/register', (req, res) => {
  let templateVars = {
    user: {id: undefined, name: null}
  };
  res.render('register', templateVars);
});

app.get('/profile', (req, res) => {
  res.render('profile');
});

app.post('/updateprofile', (req, res) => {

  try {
    const username = req.body.username;
    const email = req.body.email;
    const password = req.body.password;

    updateuserProfile(username, email, password);

    res.redirect('/');

  } catch (err) {
    console.log(err);
  }
});

app.get('/category', (req, res) => {
  res.render('category');
});

app.get('/profile', (req, res) => {
  res.render('profile');
});

app.get('/category', (req, res) => {
  res.render('category');
});

app.get('/chat', (req, res) => {
  res.render('chat');
});

// In-memory conversation history
const conversation = [];

app.post('/api/openai', async (req, res) => {
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


app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});
