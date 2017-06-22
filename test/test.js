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

    it('keys from the second object should override the target', function() {
      var obj = { a: 1 };
      var override = { a: 2 };
      var mergedObj = configMergeLoader(obj, override);
      assert.deepEqual(mergedObj, { a: 2 });
    });

    it('should merge deeply nested properties', function() {
      var obj = {
        a: 1,
        b: { a: 1, b: 1 },
        c: 1
      };
      var override = {
        a: 2,
        b: { a: 2 }
      };

      var mergedObj = configMergeLoader(obj, override);

      assert.deepEqual(mergedObj, {
        a: 2,
        b: { a: 2, b: 1 },
        c: 1
      });
    });
  });
});
