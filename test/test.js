var assert = require('assert');
var configMergeLoader = require('../index.js');

describe('configMergeLoader', function() {
  it('should return an function', function() {
    assert.equal(typeof configMergeLoader, 'function');
  });

  describe('the function', function() {
    it('should return an object', function() {
      var mergedObj = configMergeLoader();
      assert.equal(typeof mergedObj, 'object');
    });

    it('when given only a default object, should just return that object', function() {
        var defaultObj = { a: 1 };
        var mergedDefault = configMergeLoader(defaultObj);
        assert.equal(defaultObj, mergedDefault);
    });
  });
});
