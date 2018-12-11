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
        message: `Will create an application under the directory(${appPath}), may overwrite existing files, OK?`,
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
        logGreen('Initialize the application file successfully.');
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

function installDependencies(appPath) {
  process.chdir(appPath);
  inquirer
    .prompt([
      {
        type: 'list',
        name: 'tool',
        message: 'Which tool to use to install dependencies?',
        choices: ['npm', 'yarn', 'cnpm', 'tnpm'],
      }
    ]).then(answers => {
      logGreen('Installation project dependencies, depending on network and machine performance, may take some time, please wait.');
      const res = spawn.sync(answers.tool, ['install'], { stdio: 'inherit' });
      if (!res.error && res.status === 0) {
        logGreen('Project dependencies installed successfully.');
        runDevServer(appPath);
      } else if (res.status === 1 && answers.tool === 'npm') {
        logRed(`The project dependencies installation failed, please switch to the ${appPath} directory to manually install, then execute npm start to start the development service.`);
      } else {
        logYellow(`The ${answers.tool} command not found and will use npm to install the project dependencies.`);
        const npmRes = spawn.sync('npm', ['install'], { stdio: 'inherit' });
        if (!npmRes.error && npmRes.status === 0) {
          logGreen('Project dependencies installed successfully.');
          runDevServer(appPath);
        } else {
          logRed(`The project dependencies installation failed, please switch to the ${appPath} directory to manually install, then execute npm start to start the development service.`);
        }
      }
    })
}

function runDevServer(appPath) {
  logGreen(`Start the development service.`);
  logGreen(`You can also manually switch to the ${appPath} directory and then execute npm start to start the development service.`);
  spawn.sync('npm', ['start'], { stdio: 'inherit' });
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