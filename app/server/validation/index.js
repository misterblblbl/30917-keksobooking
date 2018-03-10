const _ = require(`lodash/fp`);

const validate = (schema, params) => {
  return _.reduce((acc, x) => {
    const value = _.flow(
        _.get(x.name),
        (val) => (_.isFunction(x.converter) ? x.converter(val) : val)
    )(params);

    const isValid = !_.overEvery(x.predicates)(value);
    const mayBeEmpty = !x.required && _.isUndefined(value);

    if (isValid && !mayBeEmpty) {
      return [...acc, x.message];
    }

    return acc;
  }, [], schema);
};

module.exports = {
  validate,
};
