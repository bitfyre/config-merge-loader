const loaderUtils = require('loader-utils');
const path = require('path');
const deepMerge = require('./lib/deep-merge');

module.exports = function(source) {
  const HEADER = '/**** Start Merge Loader ****/';
  const FOOTER = '/**** End Merge Loader ****/';
  const callback = this.async();
  const options = loaderUtils.getOptions(this);
  let mergedModule = '';

  console.log(options.override);
  console.log(path.resolve(__dirname, `test/cases/lib/${options.override}`));

  this.loadModule(path.resolve(__dirname, `test/cases/lib/${options.override}`),
    function(err, result) {
      //const merged = ;
      console.log('Error:', err);
      console.log('Results:', result);

      mergedModule = `${HEADER}\n${result}\n${FOOTER}`;

      callback(null, mergedModule);
    });

  return mergedModule;
};
