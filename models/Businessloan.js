const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const businessLoanSchema = new Schema({
  businessname: {
    type: String,
    required: true,
  },
  businesslegalname: {
    type: String,
    required: true,
  },
  businessaddress: {
    type: String,
    required: true,
  },
  businesscity: {
    type: String,
    required: true,
  },
  businessstate: {
    type: String,
    required: true,
  },
  businesszipcode: {
    type: String,
    required: true,
  },
  businessphonenumber: {
    type: String,
    required: true,
  },
  businesswebsite: {
    type: String,
    required: true,
  },
  taxidnumber: {
    type: String,
    required: true,
  },
  annualrevenue: {
    type: String,
    required: true,
  },
  entity: {
    type: String,
    required: true,
  },
  industrytype: {
    type: String,
    required: true,
  },
  businessstartdate: {
    type: Date,
    required: true,
  },
  requestamount: {
    type: String,
    required: true,
  },
  useoffund: {
    type: String,
    required: true,
  },
  businessownership: {
    type: String,
    required: true,
  },
  firstname: {
    type: String,
    required: true,
  },
  lastname: {
    type: String,
    required: true,
  },
  phonenumber: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    lowercase: true,
  },
  country: {
    type: String,
    required: true
  },
  homeaddress: {
    type: String,
    required: true
  },
  state: {
    type: String,
    required: true
  },
  city: {
    type: String,
    required: true
  },
  zipcode: {
    type: String,
    required: true
  },
  ninnumber: {
    type: String,
    required: true
  },
  dob: {
    type: Date,
    required: true
  },
  loanamount: {
    type: String,
    required: true
  },
  lowestrevenue: {
    type: String,
    required: false
  },
  informedmethod: {
    type: String,
    required: false
  },
  creditscore: {
    type: String,
    required: true
  },
  commethod: {
    type: String,
    required: true
  },
  bankaccount: {
    type: String,
    required: true
  },
  creditcard: {
    type: String,
    required: true
  },
  accountname: {
    type: String,
    required: true
  },
  fundtype: {
    type: String,
    required: true
  },
  monthlyrevenue: {
    type: String,
    required: true
  },
  images: [String],
}, { timestamps: true });

const BusinessLoan = mongoose.model('BusinessLoan', businessLoanSchema);
module.exports = BusinessLoan;