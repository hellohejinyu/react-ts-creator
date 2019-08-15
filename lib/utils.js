const chalk = require('chalk');
const inquirer = require('inquirer');
const spawn = require('cross-spawn');
const fs = require('fs');
const fse = require('fs-extra');
const path = require('path');
const ejs = require('./ejs');

const log = console.log;

function logGreen(msg) {
  log(chalk.green(msg));
}

function logRed(msg) {
  log(chalk.red(msg));
}

function logYellow(msg) {
  log(chalk.yellow(msg));
}

function initProj(appPath) {
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
        logGreen('You have canceled the operation without any changes.');
      } else {
        fse.copySync(path.resolve(__dirname, '../template/app'), appPath)
        fse.copySync(path.resolve(__dirname, '../template/extra/gitignore.file'), path.resolve(appPath, '.gitignore'))
        // await askQuestions(appPath);
        logGreen('Initialize the App files successful.');
        installDependencies(appPath);
      }
    })
}

async function askQuestions(appPath) {
  return new Promise(resolve => {
    inquirer
      .prompt([
        {
          type: 'input',
          name: 'name',
          message: '项目名称？',
          default: 'generator-dva'
        },
        {
          type: 'input',
          name: 'description',
          message: '项目介绍？',
          default: 'generator-dva is convenient'
        },
        {
          type: 'input',
          name: 'author',
          message: '项目作者？',
          default: 'generator-dva'
        },
        {
          type: 'confirm',
          name: 'antd',
          message: '项目中需要 antd 吗？',
          default: true
        }
      ]).then(async (answers) => {
        await renderEjsTmpl(answers, appPath);
        resolve(true);
      })
  })
}

function done () {
  console.log('✨ Done.')
}

function installDependencies(appPath) {
  process.chdir(appPath);
  inquirer
    .prompt([
      {
        type: 'list',
        name: 'tool',
        message: 'Which tool to use to install dependencies?',
        choices: ['npm', 'yarn'],
      }
    ]).then(answers => {
      console.log(`Installing ${chalk.cyan('react')}, ${chalk.cyan('react-dom')}, and ${chalk.cyan('react-router-dom')}...`);
      const res = spawn.sync(answers.tool, ['install'], { stdio: 'inherit' });
      if (!res.error && res.status === 0) {
        done()
        runDevServer(appPath);
      }
    })
}

function runDevServer(appPath) {
  console.log('')
  console.log('Initialized a git repository.')
  spawn.sync('git', ['init'], { stdio: 'inherit' })
  console.log('')
  console.log(`Success! Created App at ${appPath}`)
  console.log('')
  console.log('We suggest that you begin by typing:')
  console.log('')
  console.log(`  ${chalk.cyan('cd')} ${appPath}`)
  console.log(`  ${chalk.cyan('npm start')}`)
  console.log('')
  console.log('Happy coding!')
}

async function renderEjsTmpl(arg, appPath) {
  return new Promise((resolveAll) => {
    new Promise((resolve, reject) => {
      fs.readFile(path.resolve(__dirname, '../ejs/meta.json'), function(err, data) {
        if (!err) {
          const res = JSON.parse(data.toString());
          resolve(res);
        } else {
          reject(err);
        }
      })
    }).then((fileData) => {
      fileData.forEach(async (file) => {
        const res = await ejs.renderEjsFile(path.resolve(__dirname, `../ejs/${file.filename}`), arg);
        fs.writeFile(path.resolve(appPath, `${file.dist}${file.filename.slice(0, -4)}`), res, { flag: 'w' }, function(err) {
          if (!err) {
            // logGreen(`${file.filename.slice(0, -4)} 生成成功`);
          } else {
            console.log(err.message);
          }
        });
      })
      resolveAll(true);
    })
  })
}

module.exports = {
  logGreen,
  logRed,
  installDependencies,
  renderEjsTmpl,
  initProj
}