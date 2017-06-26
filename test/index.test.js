const assert = require('assert');
const configMergeLoader = require('../index.js');

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
  });
});
