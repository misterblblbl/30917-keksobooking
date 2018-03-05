const _ = require(`lodash/fp`);

const validate = (schema, params) => {
  return _.reduce((acc, x) => {
    const value = _.get(x.name, params);

    if (!_.overEvery(x.predicates)(value)) {
      return [...acc, x.message];
    }

    return acc;
  }, [], schema);
};

module.exports = {
  validate,
};
