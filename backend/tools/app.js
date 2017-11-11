const commander = require('commander')
const database = require('./database/database')


commander
  .version('1.0')
  .option('-c, --company [name]', 'Specify company name')
  .option('-u, --username [username]', 'Specify username')
  .option('-p, --password [password]', 'Specify password')
  .parse(process.argv)

if(commander.company) {
  if (!commander.username) {
    console.log('Please specify a username')
  }
  if (!commander.password) {
    console.log('Please specify a password')
  }

  database.addCompany(commander.company)
  database.getCompanyByName(commander.company).then(function(results) {
    console.log("----")
    console.log(results)
    console.log("----")
  })
//  database.addAccount(commander.username, commander.password, true, company.id)
}