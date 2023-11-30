'use strict';

const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class Course extends Model {}

    Course.init({
        title: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notNull: {
                    msg: 'Please enter a course title'
                },
                notEmpty: {
                    msg: 'Please enter a course title'
                }
            }
        },
        description: {
            type: DataTypes.TEXT,
            allowNull: false,
            validate: {
                notNull: {
                    msg: 'Please enter a course description'
                },
                notEmpty: {
                    msg: 'Please enter a course description'
                }
            }
        },
        estimatedTime: {
            type: DataTypes.STRING
        },
        materialsNeeded: {
            type: DataTypes.STRING
        },
     }, { sequelize });

     Course.associate = (models) => {
        Course.belongsTo(models.User, {
            as: "owner",
            foreignKey: {
                fieldName: 'userId',
                allowNull: false
            }
        });
     }
    return Course;
};