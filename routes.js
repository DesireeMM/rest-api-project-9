'use strict';

const express = require('express');
const router = express.Router();
const User = require('./models').User;
const Course = require('./models').Course;

// Route that returns all users
router.get('/users', async (req, res) => {
    const users = await User.findAll();
    res.status(200).json(users);
})
// Route that returns all courses
router.get('/courses', async (req, res) => {
    const courses = await Course.findAll();
    res.status(200).json(courses);
})

module.exports = router;