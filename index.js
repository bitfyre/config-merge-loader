const loaderUtils = require('loader-utils');
const path = require('path');
const deepMerge = require('./lib/deep-merge');

module.exports = function(source) {
  const callback = this.async();
  const options = loaderUtils.getOptions(this);
  const overridePath = path.resolve(__dirname,
    `test/cases/lib/${options.override}`);

  this.cacheable && this.cacheable();

  this.loadModule(overridePath,
    function(err, overrideSource, sourceMap, module) {
      if (err) { return callback(err); }
      const override = overrideSource
        .replace(/^ ?module.exports ?= ?/i, '')
        .replace(/\;/g, '');

      const mergedModule = deepMerge(JSON.parse(source), JSON.parse(override));

      callback(null, JSON.stringify(mergedModule));
    });
};
