const auth = require('express').Router();
const authController = require('../controllers/authenticated');
const authController2 = require('../controllers/auth');
const { body } = require('express-validator');
const bcrypt = require('bcrypt');
const authMid = require('../middleware/auth');
const uploadProfile = require('../middleware/uploadProfile');


const authRegisValid = [
  body('email')
    .isEmail().withMessage('Email format invalid'),
  body('username')
    .isLength({min: 4}).withMessage('Username length must be atleast 4 characters'),
  body('password')
    .isLength({min: 8}).withMessage('Password length must be atleast 8 characters')
    .customSanitizer(async (val) => {
      const hash = await bcrypt.hash(val, 10);
      return hash;
    }),
];

const authCreatePinValid = [
  body('email')
    .isEmail().withMessage('Email format invalid'),
  body('pin')
    .isLength({min: 6, max: 6}).withMessage('PIN must be 6 numbers').isNumeric().withMessage('Pin must be a number'),
];

const authLoginValid = [
  body('email')
    .isEmail().withMessage('Email format invalid'),
];

const editAuthProfile = [
  body('fullname').isLength({min: 7}).withMessage('Fullname length minimal 7'),
  body('phone_number').isLength({min: 12}).withMessage('Phone number length minimal 12')
];

const authChangePassword = [
  body('password')
    .isLength({min: 8}).withMessage('Password length must be atleast 8 characters')
    .customSanitizer(async (val) => {
      const hash = await bcrypt.hash(val, 10);
      return hash;
    }),
];

const authChangePin = [
  body('pin')
    .isLength({min: 6, max: 6}).withMessage('PIN must be 6 numbers').isNumeric().withMessage('Pin must be a number'),
];

const authChangePhoneNumber = [
  body('phone_number').isLength({min: 12}).withMessage('Phone number length minimal 12')
];

auth.post('/register', authMid, ...authRegisValid, authController2.register);
auth.post('/createPin', authMid, ...authCreatePinValid,  authController2.createPin);
auth.post('/login', ...authLoginValid,  authController2.login);
auth.get('/profile', authMid, authController.getProfileByUserId);
auth.get('/historyTransactions', authMid, authController, authController.getProfileByUserId);
auth.post('/transfer', authMid, authController.transfer);
auth.post('/phone', authMid, authController.addPhone);
auth.patch('/profile', authMid, uploadProfile, ...editAuthProfile, authController.editProfileByUserId);
auth.patch('/changePassword', authMid, ...authChangePassword, authController.changePassword);
auth.patch('/changePin', authMid, ...authChangePin, authController.changePin);
auth.patch('/phone', authMid, ...authChangePhoneNumber, authController.changePhoneNumber);

module.exports = auth;