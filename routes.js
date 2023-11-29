'use strict';

const express = require('express');
const router = express.Router();
const User = require('./models').User;
const Course = require('./models').Course;

// Route that returns all users
router.get('/users', async (req, res) => {
    const users = await User.findAll();
    res.status(200).json(users);
});

// Route that returns all courses
router.get('/courses', async (req, res) => {
    const courses = await Course.findAll();
    res.status(200).json(courses);
});

// Route to create a new user
router.post('/users', async(req, res) => {
    const user = await User.create(req.body);
    res.status(201).location('/').end();
});

module.exports = router;