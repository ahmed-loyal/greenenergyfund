const User = require("../models/User");
const PersonalLoan = require('../models/Personalloan');
const BusinessLoan = require('../models/Businessloan');
const jwt = require('jsonwebtoken');
const adminLayout = '../views/layouts/admin';
const adminForm = '../views/layouts/adminform';

// handle errors
const handleErrors = (err) => {
  console.log(err.message, err.code);
  let errors = { email: '', password: '' };

  // incorrect email
  if (err.message === 'incorrect email') {
    errors.email = 'That email is not registered';
  }

  // incorrect password
  if (err.message === 'incorrect password') {
    errors.password = 'That password is incorrect';
  }

  //duplicate email error
  if (err.code === 11000) {
    errors.email = 'that email is already registered';
    return errors;
  }

  // validation errors
  if (err.message.includes('user validation failed')) {
    // console.log(err);
    Object.values(err.errors).forEach(({ properties }) => {
      // console.log(val);
      // console.log(properties);
      errors[properties.path] = properties.message;
    });
  }
  
  return errors;
};

// create json web token
const maxAge = 3 * 24 * 60 * 60;
const createToken = (id) => {
  return jwt.sign({ id }, 'green energy secret', {
    expiresIn: maxAge
  });
};

// controller actions
module.exports.signup_get = (req, res) => {
  res.render('admin/signup', { title: 'GreenEnergy Sign up page', layout: adminForm});
};

module.exports.admin_get = (req, res) => {
  res.render('admin/signin', { title: 'GreenEnergy Sign in page', layout: adminForm});
};

module.exports.signup_post = async (req, res) =>{
  const { email, password } = req.body;

  try {
    const user = await User.create ({email, password});
    const token = createToken(user._id);
    res.cookie('jwt', token, {httpOnly: true, maxAge: maxAge * 1000});
    res.status(201).json({ user: user._id });
  }
  catch(err) {
    const errors = handleErrors(err);
    res.status(400).send('error, user not created');
  }
};

module.exports.admin_post = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.login(email, password);
    const token = createToken(user._id);
    res.cookie('jwt', token, {httpOnly: true, maxAge: maxAge * 1000});
    res.status(200).json({ user: user._id })
  }
  catch (err) {
    const errors = handleErrors(err);
    res.status(400).json({ errors });
  }
};

module.exports.dashboard_get = async (req, res) => {
  try{
    const personalLoanCount = await PersonalLoan.countDocuments({});
    const businessLoanCount = await BusinessLoan.countDocuments({});
    res.render('admin/dashboard', {
      title: 'GreenEnergy Dashboard',
      personalLoanCount: personalLoanCount,
      businessLoanCount: businessLoanCount,
      layout: adminLayout
    });
  }catch(err){
    res.status(500).json({ error: err.message });
  }
  // res.render('admin/dashboard', { title: 'GreenEnergy Dashboard', layout: adminLayout});
};

module.exports.personalloandata_get = (req, res) => {
  PersonalLoan.find().sort({ createdAt: -1 })
    .then(result => {
      res.render('admin/personalloandata', { personalloans: result, title: 'Personal Loans', layout: adminLayout});
    })
    .catch(err => {
      console.log(err);
    });
};

module.exports.businessloandata_get = (req, res) => {
  BusinessLoan.find().sort({ createdAt: -1 })
    .then(result => {
      res.render('admin/businessloandata', { businessloans: result, title: 'Personal Loans', layout: adminLayout});
    })
    .catch(err => {
      console.log(err);
    });
};

module.exports.logout_get = (req, res) => {
  res.cookie('jwt', '', { maxAge: 1 });
  res.redirect('/admin');
};

module.exports.personalloandata_delete = (req, res) =>{
  const id = req.params.id;
  PersonalLoan.findByIdAndDelete(id)
    .then(result => {
      res.json({ redirect: '/personalloandata' });
    })
    .catch(err => {
      res.status(404).render('404', {title: 'page not found'});
    });
};

module.exports.businessloandata_delete = (req, res) =>{
  const id = req.params.id;
  BusinessLoan.findByIdAndDelete(id)
    .then(result => {
      res.json({ redirect: '/businessloandata' });
    })
    .catch(err => {
      res.status(404).render('404', {title: 'page not found'});
    });
}; 