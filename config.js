
const path = require('path');
const rootPath = __dirname;

module.exports = {
  rootPath,
  uploadPath: path.join(rootPath, 'public/uploads'),
  mySqlConfig: {
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'inventory',
  }
};
