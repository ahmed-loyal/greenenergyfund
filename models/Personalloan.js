const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const personalLoanSchema = new Schema({
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
  agent: {
    type: String,
    required: false
  },
  agentid: {
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

const PersonalLoan = mongoose.model('PersonalLoan', personalLoanSchema);
module.exports = PersonalLoan;