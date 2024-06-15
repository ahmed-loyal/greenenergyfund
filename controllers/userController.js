const PersonalLoan = require('../models/Personalloan');
const BusinessLoan = require('../models/Businessloan');


// controller actions
module.exports.index_get = (req, res) => {
    res.render('index', { title: 'Greenery Fund - Asset Management & Loans'});
  }

module.exports.consultpage_get = (req, res) => {
  res.render('consultpage', { title: 'Let us handle it for you!'});
}

module.exports.applyloan_get = (req, res) => {
    res.render('applyloan', { title: 'Apply Loan'});
  }

module.exports.personalloan_get = (req, res) => {
  res.render('personalloan', { title: 'Personal Loan'});
}

module.exports.businessloan_get = (req, res) => {
  res.render('businessloan', { title: 'Business Loan'});
}

module.exports.personalloan_post = (req, res) => {
  const userData = {
    ...req.body,
    bankStatement: req.files.bankStatement ? req.files.bankStatement[0].path : '',
    idFront: req.files.idFront ? req.files.idFront[0].path : '',
    idBack: req.files.idBack ? req.files.idBack[0].path : ''
  };
  
  const personalloan = new PersonalLoan(userData);

  personalloan.save()
  .then(result => {
    res.redirect('/applicationcompleted');
  })
  .catch(err => {
    console.log(err);
  });      
  
}

module.exports.businessloan_post = (req, res) => {
  const userData = {
    ...req.body,
    bankStatement: req.files.bankStatement ? req.files.bankStatement[0].path : '',
    idFront: req.files.idFront ? req.files.idFront[0].path : '',
    idBack: req.files.idBack ? req.files.idBack[0].path : ''
  };
  

  const businessloan = new BusinessLoan(userData);

  businessloan.save()
  .then(result => {
    res.redirect('/applicationcompleted');
  })
  .catch(err => {
    console.log(err);
  });  
}

module.exports.applicationcompleted_get = (req, res) => {
  res.render('applicationcompleted', { title: 'Application Completed Successfully'});
}