const deepMerge = (base, override) => {
  if (override === undefined) {
    return base || {};
  }

  let mergedObj = Object.assign({}, base);

  Object.keys(override).forEach((key) => {
    if (isObject(override[key])) {
      if (!base.hasOwnProperty(key)) {
        Object.assign(mergedObj, {
          [key]: override[key]
        });
      } else {
        mergedObj[key] = deepMerge(base[key], override[key]);
      }
    } else {
      Object.assign(mergedObj, {
        [key]: override[key]
      });
    }
  });

  return mergedObj;
};

const isObject = (item) => {
  return typeof item === 'object' && !Array.isArray(item) && item !== null;
};

module.exports = deepMerge
