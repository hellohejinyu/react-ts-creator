const ejs = require('ejs');

async function renderEjsFile(ejsFile, data) {
  return new Promise((resolve, reject) => {
    ejs.renderFile(ejsFile, data, function(err, str) {
      if (!err) {
        resolve(str);
      } else {
        reject(err);
      }
    })
  })
}

module.exports = {
  renderEjsFile
}