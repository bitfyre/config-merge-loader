module.exports = function(base, override) {
  let mergedObj = base || {}
  if (override === undefined) {
    return mergedObj;
  }

  return mergedObj;
};
