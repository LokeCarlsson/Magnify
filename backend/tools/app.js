const commander = require('commander');
const mongoose = require('mongoose');
const config = require('../config.js');
const account = require('./account');
const company = require('./company');
const category = require('./category');

mongoose.Promise = require('bluebird');
mongoose.connect(config.mongo.url, { useMongoClient: true });

// Specifying version
commander
  .version('1.0');

// Account subcommand
commander
    .command('account')
    .description('Actions dealing with accounts')
    .option('-L, --list', 'Lists all accounts')
    .option('-C, --create', 'Creates an account')
    .option('-u, --username [username]', 'Specify username')
    .option('-p, --password [password]', 'Specify password')
    .option('-r, --role', 'Specifies the role of the user')
    .option('-c, --company [name]', 'Specify company name')
    .action((flags) => {
      if (flags.list) {
        account.list();
      }      else if (flags.create) {
        if (!flags.username) {
          console.log('Please specify username');
        }
        if (!flags.password) {
          console.log('Please specify a password');
        }
        if (!flags.company) {
          console.log('Please specify a company');
        }
        if (!flags.role) {
          console.log('Please specify a role');
        }

        account.createAccount(flags.username, flags.password, flags.company, flags.role);

      } else {
        console.log('No valid action found');
        mongoose.connection.close();
      }
    });

// Company Subcommand
commander
    .command('company')
    .option('-L, --list', 'Lists all companies')
    .description('Actions dealing with companies')
    .action((flags) => {
      if (flags.list) {
        company.list();
      }
    });

// Category Subcommand
commander
.command('category')
.option('-L, --list', 'Lists all categories')
.option('-C, --create', 'Creates a category')
.option('-n, --name', 'Specify name')
.option('-p, --parent', 'Specify parent or is set to root if not specified')
.action((flags) => {
  if (flags.list) {
    category.list();
  } else if (flags.create) {
    if (!flags.name) {
      console.log('Please specify a category name');
    }
    category.createCategory(flags.name, flags.parent);
  } else {
    console.log('No valid action found');
  }
});

commander.parse(process.argv);
