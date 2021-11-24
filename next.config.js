const path = require('path');

const removeImports = require('next-remove-imports')();
module.exports = removeImports({
  images: {
    // https://nextjs.org/docs/messages/next-image-unconfigured-host
    domains: ['media.graphcms.com']
  },
  sassOptions: {
    includePaths: [path.join(__dirname, 'styles')]
  }
});