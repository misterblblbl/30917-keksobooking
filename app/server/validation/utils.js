const _ = require(`lodash/fp`);

const isPositive = (x) => x >= 0;

const convertToInt = (x) => (parseInt(x, 10));

const isWithinRange = _.curry((min, max, x) => ((x <= max) && (x >= min)));

const isStrWithinRange = _.curry((min, max, str) => {
  return _.isString(str) && isWithinRange(min, max)(str.length);
});

const isImage = (image) => _.flow(
    _.get(`mimetype`),
    _.startsWith(`image/`)
)(image);

const compareArrays = _.curry((base, incoming) => _.flow(
    _.filter((x) => !_.includes(x, base)),
    _.isEmpty
)(incoming));

module.exports = {
  isPositive,
  isWithinRange,
  isStrWithinRange,
  convertToInt,
  compareArrays,
  isImage,
};
