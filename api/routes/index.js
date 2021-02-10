const express = require('express');
const router = express.Router();

const { validationResult } = require('express-validator');

const Account = require('../models').Account;

function asyncHandler(cb){
  return async(req, res, next) => {
    try {
      await cb(req, res, next)
    } catch(error){
      res.status(500).send(errorr);
      console.log(error.message)
    }
  }
}

/* GET home page. */
router.get('/accounts', asyncHandler(async (req, res) => {
  const accounts = await Account.findAll();
  res.json({ accounts });
}));

router.post('/accounts', asyncHandler(async (req, res) => {
  const errors = validationResult(req);
 if (!errors.isEmpty()) {
  const errorMessages = errors.array().map(error => error.msg);
  res.status(400).json({ errors: errorMessages });
 } else { 
  res.status(201).end();
  let newAccount;
  newAccount = await Account.create(req.body);
  res.location("/accounts/");
  res.status(201).end();
 }
}));

router.delete('/accounts/:id', asyncHandler(async (req, res) => {
  const account = await Account.findByPk(req.params.id);
  account.destroy();
  res.status(200).end();

}));

module.exports = router;
