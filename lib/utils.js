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
        message: `将在目录(${appPath})下创建应用，可能会覆盖已有文件，确定？`,
        default: false
      }
    ])
    .then(async answers => {
      if (!answers.rewrite) {
        logGreen('您已取消操作');
      } else {
        fse.copySync(path.resolve(__dirname, '../template/app'), appPath)
        // await askQuestions(appPath);
        logGreen('初始化应用文件成功');
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
        message: '使用什么工具安装项目依赖？',
        choices: ['npm', 'yarn', 'cnpm', 'tnpm'],
      }
    ]).then(answers => {
      logGreen('安装项目依赖中，受网络和机器性能影响，可能需要一些时间，请稍候');
      const res = spawn.sync(answers.tool, ['install'], { stdio: 'inherit' });
      if (!res.error && res.status === 0) {
        logGreen('安装项目依赖成功');
        runDevServer(appPath);
      } else if (res.status === 1 && answers.tool === 'npm') {
        logRed(`项目依赖安装失败，请切换到${appPath}目录手动安装依赖，然后执行npm start启动开发服务`);
      } else {
        logYellow(`系统没有找到${answers.tool}命令，将使用npm安装项目依赖`);
        const npmRes = spawn.sync('npm', ['install'], { stdio: 'inherit' });
        if (!npmRes.error && npmRes.status === 0) {
          logGreen('安装项目依赖成功');
          runDevServer(appPath);
        } else {
          logRed(`项目依赖安装失败，请切换到${appPath}目录手动安装依赖，然后执行npm start启动开发服务`);
        }
      }
    })
}

function runDevServer(appPath) {
  logGreen(`启动开发服务`);
  logGreen(`您也可以手动切换到${appPath}目录，然后执行npm start启动开发服务`);
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