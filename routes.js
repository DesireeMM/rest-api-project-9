'use strict';

const express = require('express');
const bcrypt = require('bcryptjs');
const auth = require('basic-auth');
const router = express.Router();
const User = require('./models').User;
const Course = require('./models').Course;

// Helper functions
function asyncHandler(cb) {
    return async(req, res, next) => {
        try {
            await cb(req, res, next);
        } catch (error) {
            next(error);
        }
    }
}

async function authenticateUser(req, res, next) {
    let message;
    const credentials = auth(req);

    if (credentials) {
        const user = await User.findOne({where: {emailAddress: credentials.name}});
        if (user) {
            const authenticated = bcrypt.compareSync(credentials.pass, user.password);
            if (authenticated) {
                console.log(`Authentication successful for ${user.firstName}`);
                req.currentUser = user;
            } else {
                message = `Authentication failure for user ${user.firstName} ${user.lastName}`;
            }
        } else {
            message = `User not found for email: ${credentials.name}`
        }
    } else {
        message = 'Auth header not found';
    }

    if (message) {
        console.warn(message);
        res.status(401).json({message: 'Access Denied'})
    } else {
        next();
    }
};

// Route that returns the authenticated user
router.get('/users', authenticateUser, asyncHandler(async (req, res) => {
    const user = req.currentUser;
    const userToDisplay = {
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        emailAddress: user.emailAddress
    }
    res.status(200).json(userToDisplay);
}));

// Route that returns all courses
router.get('/courses', asyncHandler(async (req, res) => {
    const courses = await Course.findAll({
        attributes: {
            exclude: ['userId', 'createdAt', 'updatedAt']
        },
        include: [
            {
                model: User,
                as: 'owner',
                attributes: ['id', 'firstName', 'lastName', 'emailAddress']
            }
        ]
    });
    res.status(200).json(courses);
}));

// Route to create a new user
router.post('/users', asyncHandler(async(req, res) => {
    try {
        const user = req.body;
        let password = user.password;
        if (password) {
            user.password = bcrypt.hashSync(password, 10);
        }
        await User.create(user);
        res.status(201).location('/').end();
    } catch (error) {
        if (error.name === 'SequelizeValidationError' || error.name === 'SequelizeUniqueConstraintError') {
            const errors = error.errors.map(err => err.message);
            res.status(400).json({errors})
        } else {
            throw error;
        }
    }
}));

// Route to return a specific course
router.get('/courses/:id', asyncHandler( async(req, res) => {
    const course = await Course.findByPk(req.params.id, {
        attributes: {
            exclude: ['userId', 'createdAt', 'updatedAt']
        },
        include: [
            {
                model: User,
                as: 'owner',
                attributes: ['id', 'firstName', 'lastName', 'emailAddress']
            }
        ]
    });
    if (course) {
        res.status(200).json(course);
    } else {
        const error = new Error('Course not found.')
        error.status = 404;
        throw error;
    }
}));

// Route to create a new course
router.post('/courses', authenticateUser, asyncHandler( async(req, res) => {
    try {
        const course = await Course.create(req.body);
        const courseId = course.id;
        res.status(201).location(`/courses/${courseId}`).end();
    } catch (error) {
        if (error.name === 'SequelizeValidationError') {
            const errors = error.errors.map(err => err.message);
            res.status(400).json({errors})
        }
    }
}));

// Route to update a specific course
router.put('/courses/:id', authenticateUser, async(req, res) => {
    const user = req.currentUser;
    const course = await Course.findByPk(req.params.id);
    if (course && course.userId === user.id) {
        await course.update(req.body);
        res.status(204).end();
    } else if (course) {
        res.status(403).end();
    } else {
        const error = new Error('Course not found.');
        error.status = 404;
        throw error;
    }
});

// Route to delete a specific course
router.delete('/courses/:id', authenticateUser, async (req, res) => {
    const user = req.currentUser;
    const course = await Course.findByPk(req.params.id);
    if (course && course.userId === user.id) {
        await course.destroy();
        res.status(204).end();
    } else if (course) {
        res.status(403).end();
    } else {
        const error = new Error('Course not found.');
        error.status = 404;
        throw error;
    }
});

module.exports = router;