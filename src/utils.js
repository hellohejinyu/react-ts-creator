const chalk = require('chalk')
const inquirer = require('inquirer')
const spawn = require('cross-spawn')

const log = console.log

function logGreen (msg) {
  log(chalk.green(msg))
}

function logYellow (msg) {
  log(chalk.yellow(msg))
}

function logRed (msg) {
  log(chalk.red(msg))
}

function initProj (appPath) {
  inquirer
    .prompt([
      {
        type: 'confirm',
        name: 'rewrite',
        message: `Will create a new React&TypeScript App in ${chalk.green(appPath)}. Yes Or No?`,
        default: false
      }
    ])
    .then(async answers => {
      if (!answers.rewrite) {
        logGreen('You have canceled the operation without any changes.')
      } else {
        logYellow('🌎Get the App base files from GitHub.')
        const res = spawn.sync('git', ['clone', 'https://github.com/elowes/react-ts-creator-template', appPath], { stdio: 'inherit' })
        if (!res.error && res.status === 0) {
          // 删除模板里面的 .git
          spawn.sync('rm', ['-rf', `${appPath}/.git`])
          logGreen('Initialize the App files successful.')
          installDependencies(appPath)
        } else {
          logRed('❌Failed to get App base files from GitHub.')
        }
      }
    })
}

function done () {
  console.log('✨ Done.')
}

function installDependencies (appPath) {
  process.chdir(appPath)
  inquirer
    .prompt([
      {
        type: 'list',
        name: 'tool',
        message: 'Which tool to use to install dependencies?',
        choices: ['npm', 'yarn']
      }
    ]).then(answers => {
      console.log(`Installing ${chalk.cyan('react')}, ${chalk.cyan('react-dom')}, and ${chalk.cyan('react-router-dom')}...`)
      const res = spawn.sync(answers.tool, ['install'], { stdio: 'inherit' })
      if (!res.error && res.status === 0) {
        done()
        runDevServer(appPath, answers.tool)
      }
    })
}

function runDevServer (appPath, tool) {
  console.log('')
  console.log('Initialized a git repository.')
  spawn.sync('git', ['init'], { stdio: 'inherit' })
  console.log('')
  console.log(`Success! Created App at ${appPath}`)
  console.log('')
  console.log('We suggest that you begin by typing:')
  console.log('')
  console.log(`  ${chalk.cyan('cd')} ${appPath}`)
  console.log(`  ${chalk.cyan(`${tool} start`)}`)
  console.log('')
  console.log('Happy coding!')
}

module.exports = {
  logGreen,
  logRed,
  installDependencies,
  initProj
}
