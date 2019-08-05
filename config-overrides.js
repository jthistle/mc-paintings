const { addBabelPlugin, override } = require('customize-cra');

module.exports = override(addBabelPlugin('styled-jsx/babel'));
