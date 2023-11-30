'use strict';

const bcrypt = require('bcryptjs');
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class User extends Model {}

    User.init({
        firstName: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notNull: {
                    msg: 'Please provide your first name'
                },
                notEmpty: {
                    msg: 'Please provide your first name'
                }
            }
        },
        lastName: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notNull: {
                    msg: 'Please provide your last name'
                },
                notEmpty: {
                    msg: 'Please provide your last name'
                }
            }
        },
        emailAddress: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: {
                msg: 'That email is already taken'
            },
            validate: {
                isEmail: {
                    msg: 'Please provide a valid email'
                }
            }
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notNull: {
                    msg: 'Please enter a value for password'
                },
                notEmpty: {
                    msg: 'Please enter a value for password'
                }
            }
        }
     }, { sequelize });

     User.associate = (models) => {
        User.hasMany(models.Course, {
            as: 'owner',
            foreignKey: {
                fieldName: 'userId'
            }
        })
     }
    return User;
};