var assert = require('assert');
var configMergeLoader = require('../index.js');

describe('configMergeLoader', function() {
  it('should return an function', function() {
    assert.equal(typeof configMergeLoader, 'function');
  });

  describe('the function', function() {
    var mergedObj = configMergeLoader();

    it('should return an object', function() {
      assert.equal(typeof mergedObj, 'object');
    });
  });
});
