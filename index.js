module.exports = function(base, override) {
  let mergedObj = base || {}
  if (override === undefined) {
    return mergedObj;
  }

  mergedObj = Object.assign(base, override);

  return mergedObj;
};
