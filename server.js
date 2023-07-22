// load .env data into process.env
require('dotenv').config();

// Web server config
const sassMiddleware = require('./lib/sass-middleware');
const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
const cookieSession = require('cookie-session');
const { updateuserProfile } = require('./db/queries/profile');
const bcrypt = require('bcrypt');

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

// Separated Routes for each Resource
// Note: Feel free to replace the example routes below with your own
const userApiRoutes = require('./routes/users-api');
const widgetApiRoutes = require('./routes/widgets-api');
const usersRoutes = require('./routes/users');
<<<<<<< HEAD
const authRoutes = require('./routes/auth');
const profileRoutes = require('./routes/profile');
=======
<<<<<<< HEAD
>>>>>>> a1dadac (Created a new file under routes called auth.js which includes the code for register/login/logout. I also had to update some other files to make sure it works, those include server.js and package.json and a few other)
const registerRoutes = require('./routes/register');
const loginRoutes = require('./routes/login');
=======
const authRoutes = require('./routes/auth');
>>>>>>> 359e39a (Created a new file under routes called auth.js which includes the code for register/login/logout. I also had to update some other files to make sure it works, those include server.js and package.json and a few other)

// Mount all resource routes
// Note: Feel free to replace the example routes below with your own
// Note: Endpoints that return data (eg. JSON) usually start with `/api`
app.use('/api/users', userApiRoutes);
app.use('/api/widgets', widgetApiRoutes);
app.use('/users', usersRoutes);
<<<<<<< HEAD
app.use('/auth', authRoutes);
app.use('/profile', profileRoutes);

=======
<<<<<<< HEAD
>>>>>>> a1dadac (Created a new file under routes called auth.js which includes the code for register/login/logout. I also had to update some other files to make sure it works, those include server.js and package.json and a few other)
app.use('/register', registerRoutes());
app.use('/login', loginRoutes());
=======
app.use('/auth',authRoutes);
>>>>>>> 359e39a (Created a new file under routes called auth.js which includes the code for register/login/logout. I also had to update some other files to make sure it works, those include server.js and package.json and a few other)
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

  //to check if user is logged in
  if (!req.session.user_id) {
    res.render('../views/login');
  } else {
    let profileData = getuserProfile(req.session.user_id);

    let templateVars = {
      user: {
        id: req.session.user_id,
        name: profileData.name,
        email: profileData.email,
        password: profileData.password
      }
    };

    res.render('profile', templateVars);
  }
});

app.post('/updateprofile', (req, res) => {

  try {
    const username = req.body.username;
    const email = req.body.email;
    const password = req.body.password;

    console.log(username);
    console.log(email);
    console.log(password);

    updateuserProfile(username, email, password);

    res.redirect('/');

  } catch (err) {
    console.log(err);
  }
});

app.get('/category', (req, res) => {
  res.render('category');
});


=======
>>>>>>> 416a0f9 (add temp route for viewing category page)
app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});
