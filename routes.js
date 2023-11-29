'use strict';

const express = require('express');
const router = express.Router();
const User = require('./models').User;
const Course = require('./models').Course;

// Helper function to wrap routes
function asyncHandler(cb) {
    return async(req, res, next) => {
        try {
            await cb(req, res, next);
        } catch (error) {
            next(error);
        }
    }
}

// Route that returns all users
router.get('/users', asyncHandler(async (req, res) => {
    const users = await User.findAll();
    res.status(200).json(users);
}));

// Route that returns all courses
router.get('/courses', asyncHandler(async (req, res) => {
    const courses = await Course.findAll();
    res.status(200).json(courses);
}));

// Route to create a new user
router.post('/users', asyncHandler(async(req, res) => {
    try {
        const user = await User.create(req.body);
        res.status(201).location('/').end();
    } catch (error) {
        if (error.name === 'SequelizeValidationError') {
            const errors = error.errors.map(err => err.message);
            res.status(400).json({errors})
        } else {
            throw error;
        }
    }
}));

// Route to return a specific course
router.get('/courses/:id', async(req, res) => {
    const course = await Course.findByPk(req.params.id);
    res.status(200).json(course);
});

// Route to create a new course
router.post('/courses', async(req, res) => {
    const course = await Course.create(req.body);
    const courseId = course.id;

    res.status(201).location(`/courses/${courseId}`).end();
});

// Route to update a specific course
router.put('/courses/:id', async(req, res) => {
    const course = await Course.findByPk(req.params.id);
    await course.update(req.body);
    res.status(204).end();
});

// Route to delete a specific course
router.delete('/courses/:id', async (req, res) => {
    const course = await Course.findByPk(req.params.id);
    await course.delete();
    res.status(204).end();
});

module.exports = router;