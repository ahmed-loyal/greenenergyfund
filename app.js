require('dotenv').config();

const express = require('express');
const expressLayout = require('express-ejs-layouts');
const mongoose = require('mongoose');
const userRoutes = require('./routes/userRoutes');
const adminRoutes = require('./routes/adminRoutes');
const cookieParser = require('cookie-parser');
const { requireAuth, checkUser } = require('./middleware/authMiddleware');
const PORT = 10000;



//express app
const app = express();

//static files and middleware
app.use(express.static('public'));
app.use(express.json());
app.use(cookieParser());

//register view engine
app.use(expressLayout);
app.set('layout', './layouts/main');
app.set('view engine', 'ejs');


//database connection and listening for request
const dbURI = process.env.MONGODB_URI;
mongoose.connect(dbURI)
  .then((result) => console.log("connected to db"), app.listen(PORT, () => {
    console.log(`App now listening for request on port ${PORT}`);
  }))
  .catch((err) => console.log(err));

//routes
app.get('*', checkUser);
app.use(userRoutes);
app.use(adminRoutes);

//404 page
app.use((req, res) => {
    res.status(404).render('404', { title: '404'});
});

// cookies
/*app.get('/set-cookies', (req, res) => {

  // res.setHeader('Set-Cookie', 'newUser=true');
  
  res.cookie('newUser', false);
  res.cookie('isAdmin', true, { maxAge: 1000 * 60 * 60 * 24, httpOnly: true });

  res.send('you got the cookies!');

});

app.get('/read-cookies', (req, res) => {

  const cookies = req.cookies;
  console.log(cookies.newUser);

  res.json(cookies);

});*/