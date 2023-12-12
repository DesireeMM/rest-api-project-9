# Treehouse FSJS Techdegree Unit 9 Project

Learn more about the developer on [LinkedIn](https://www.linkedin.com/in/desiree-morimoto-9470481b0/)

## Table of Contents
- [Project Description](#overview)
- [Technologies Used](#technologiesused)
- [Required Features](#requiredfeatures)
- [Additional Features](#extrafeatures)

## Project Information

#### <a name="overview"></a>Description
This project involved creating a REST API to administer a school database.

#### <a name="technologiesused"></a>Technologies Used
- JavaScript
  - Express
- Sequelize
- [Sequelize CLI](https://www.npmjs.com/package/sequelize-cli#installation)
- [SQLite](https://www.sqlite.org/index.html)
- [Postman](https://www.postman.com/) for testing routes
- [DB Browser for SQLite](https://sqlitebrowser.org/) to view database

#### <a name="requiredfeatures"></a>Required Features
- Download project starter files and install dependencies
- Define User and Course models, including model associations
- Sync my models with the existing SQLite database 
- Create routes and views to handle features
  - A GET route to return an authenticated User
  - A POST route to create a new user
  - A GET route to return all courses
  - A GET route to return an individual course
  - A POST route to create a new course
  - A PUT route to update an existing course
  - A DELETE route to delete an existing course
- Set up error handling middleware
- Set up model validation
- Use the bcrypt library for password security
- Add user authentication middleware to the following routes:
  - /api/users GET
  - /api/courses POST
  - /api/courses/:id PUT
  - /api/courses/:id DELETE

#### <a name="extrafeatures"></a>Additional Features
- Added a unique requirement to the email address field
- Filtered responses for the /api/users, /api/courses, /api/courses/:id GET routes so they only include relevant information
- Updated error handling to include SequelizeUniqueContraintErrors
- Added protections to prevent users from updating or deleting courses they did not create