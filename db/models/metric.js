'use strict'
const Sequelize = require('sequelize')
const setupDatabase = require('../lib/db')

module.exports = function setupMetricModel(config) {
    const sequelize = setupDatabase(config)
    return sequelize.define('metric', {
        type: {
            type:Sequelize.STRING,
            allowNull: false
        },
        valor:{
            type:Sequelize.TEXT,
            allowNull: false
        },
        name:{
            type:Sequelize.STRING,
            allowNull: false
        }

    })
}
