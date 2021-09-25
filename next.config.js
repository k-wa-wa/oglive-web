const path = require('path');

module.exports = {
  sassOptions: {
    includePaths: [path.join(__dirname, 'styles')]
  }
};

const removeImports = require('next-remove-imports')();
module.exports = removeImports({});