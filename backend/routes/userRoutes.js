const express = require('express');
const router = require('express').Router();
const { check } = require('express-validator');
const { registerUser, loginUser } = require('../controllers/userController');

router.post(
    '/register',
    [
        check('email', 'Please include a valid email').isEmail(),
        check('password', 'Password must be 6 or more characters').isLength({ min: 6 }),
    ],
    registerUser
);
router.post('/login', loginUser);

module.exports = router;