const assert = require('assert');
const configMergeLoader = require('../index.js');

describe('Config Merge Loader', function() {
  it('should return a function', function() {
    assert.equal(typeof configMergeLoader, 'function');
  });
});
