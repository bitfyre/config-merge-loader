const assert = require('assert');
const configMergeLoader = require('../index.js');
const fs = require('fs');
const webpack = require('webpack');

describe('Config Merge Loader', function() {
  it('should return a function', function() {
    assert.equal(typeof configMergeLoader, 'function');
  });

  describe('when called', function() {
    const loaderInput = 'Loader Content';

    it('should return as string', function() {
      const loaderResult = configMergeLoader(loaderInput);
      assert.equal(typeof loaderResult, 'string');
    });

    it('should return the same string it is given', function() {
      const loaderResult = configMergeLoader(loaderInput);
      assert.ok(loaderResult.indexOf(loaderInput) >= 0);
    });
  });

  describe('when called via webapck', function() {
    it('should generate an entry.js file', function() {
      assert.ok(fs.existsSync('./dist/entry.js'));
    });
  });
});
