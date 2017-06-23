const assert = require('assert');
const deepMerge = require('../lib/deep-merge.js');

describe('deepMerge:', function() {
  it('should return an function', function() {
    assert.equal(typeof deepMerge, 'function');
  });

  describe('The function', function() {
    it('should return an object', function() {
      const mergedObj = deepMerge();
      assert.equal(typeof mergedObj, 'object');
    });

    it('when given only a default object, should just return that object', function() {
        const defaultObj = { a: 1 };
        const mergedDefault = deepMerge(defaultObj);
        assert.equal(defaultObj, mergedDefault);
    });

    it('keys from the second object should override the target', function() {
      const obj = { a: 1 };
      const override = { a: 2 };
      const mergedObj = deepMerge(obj, override);
      assert.deepEqual(mergedObj, { a: 2 });
    });

    it('should merge deeply nested properties', function() {
      const obj = {
        a: 1,
        b: { a: 1, b: 1 },
        c: 1
      };

      const override = {
        a: 2,
        b: { a: 2 }
      };

      const mergedObj = deepMerge(obj, override);

      assert.deepEqual(mergedObj, {
        a: 2,
        b: { a: 2, b: 1 },
        c: 1
      });
    });
  });
});
