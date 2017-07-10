const loaderUtils = require('loader-utils');
const path = require('path');
const deepMerge = require('./lib/deep-merge');

module.exports = function(source) {
  const callback = this.async();
  const options = loaderUtils.getOptions(this);
  const overridePath = path.resolve(this.context, options.override);

  this.cacheable && this.cacheable();

  this.loadModule(overridePath,
    function(err, overrideSource, sourceMap, module) {
      if (err) { return callback(err); }

      const override = overrideSource
        .replace(/^ ?module.exports ?= ?/i, '')
        .replace(/\;/g, '');
      const baseObj = JSON.parse(source);
      const overrideObj = JSON.parse(override);
      let mergedModule;

      if (!!options.baseNamespace && !!options.overrideNamespace) {
        mergedModule = {
          [options.baseNamespace]: deepMerge(baseObj[options.baseNamespace],
          overrideObj[options.overrideNamespace])
        };
      } else {
        mergedModule = deepMerge(baseObj, overrideObj);
      }

      callback(null, JSON.stringify(mergedModule));
    });
};
