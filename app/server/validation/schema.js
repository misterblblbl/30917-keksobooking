const _ = require(`lodash/fp`);

const queryParamsSchema = [
  {
    name: `limit`,
    predicates: [
      _.isFinite,
      (x) => x >= 0,
    ],
    message: `Limit param should be number >= 0`,
  },
  {
    name: `skip`,
    predicates: [
      _.isFinite,
      (x) => x >= 0,
    ],
    message: `Skip param should be number >= 0`,
  },
];

module.exports = {
  queryParamsSchema,
};
