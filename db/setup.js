'use strict'
require('dotenv').config()
const debug = require('debug')('u920415849_node:db:setup')
const db = require('./')
const inquirer = require('inquirer')
const chalk = require('chalk')

const prompt = inquirer.createPromptModule()

async function setup() {
    const answer = await prompt([{
        type: 'confirm',
        name: 'setup',
        message: 'This will detroy your databse, are you sure'
    }])
    if (!answer.setup) {
        return console.log('nothing happened :)')
    }
    const config = {
        database: process.env.DB_NAME,
        username: process.env.DB_USER,
        password: process.env.DB_PASS,
        host: process.env.DB_HOST,
        dialect: 'mysql',
        setup: true,
        logging: s => debug(s)
    }
    await db(config).catch(hadleFatalError)
    console.log('Sucess!')
    process.exit(0)
}
function hadleFatalError(err) {
    console.error(`${chalk.red('[fatal error]')} ${err.message}`)
    console.error(err.stack)
    process.exit(1)
}
setup()
