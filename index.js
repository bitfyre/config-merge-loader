const loaderUtils = require('loader-utils');
const path = require('path');
const deepMerge = require('./lib/deep-merge');

function _removeModuleSyntax (moduleSource) {
  return moduleSource
        .replace(/^ ?module.exports ?= ?/i, '')
        .replace(/\;/g, '');
};

module.exports = function(source) {
  const callback = this.async();
  const options = loaderUtils.getOptions(this);
  const overridePath = path.resolve(this.context, options.override);

  this.cacheable && this.cacheable();

  this.loadModule(overridePath,
    function(err, overrideSource, sourceMap, module) {
      if (err) { return callback(err); }

      const baseObj = JSON.parse(_removeModuleSyntax(source));
      const overrideObj = JSON.parse(_removeModuleSyntax(overrideSource));
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
