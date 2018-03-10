const _ = require(`lodash/fp`);
const {
  isPositive,
  isStrWithinRange,
  convertToInt,
  compareArrays,
  isImage,
} = require(`./utils`);
const {
  TYPES,
  CHECKIN,
  CHECKOUT,
  FEATURES,
} = require(`../../generate-entity/data`);

const MIN_SHORT_STR_LENGTH = 2;
const MAX_SHORT_STR_LENGTH = 50;

const MIN_LONG_STR_LENGTH = 5;
const MAX_LONG_STR_LENGTH = 1000;

const queryParamsSchema = [
  {
    name: `limit`,
    required: false,
    converter: convertToInt,
    predicates: [
      _.isFinite,
      isPositive,
    ],
    message: `Limit param should be number >= 0`,
  },
  {
    name: `skip`,
    required: false,
    converter: convertToInt,
    predicates: [
      _.isFinite,
      isPositive,
    ],
    message: `Skip param should be number >= 0`,
  },
];

const offerSchema = [
  {
    name: `name`,
    required: true,
    predicates: [
      isStrWithinRange(MIN_SHORT_STR_LENGTH, MAX_SHORT_STR_LENGTH)
    ],
    message: `Name should be min ${MIN_SHORT_STR_LENGTH} and max ${MAX_SHORT_STR_LENGTH} symbols`,
  },
  {
    name: `title`,
    required: true,
    predicates: [
      isStrWithinRange(MIN_LONG_STR_LENGTH, MAX_LONG_STR_LENGTH)
    ],
    message: `Title should be min ${MIN_LONG_STR_LENGTH} and max ${MAX_LONG_STR_LENGTH} symbols`,
  },
  {
    name: `address`,
    required: true,
    predicates: [
      isStrWithinRange(MIN_LONG_STR_LENGTH, MAX_LONG_STR_LENGTH)
    ],
    message: `Address should be min ${MIN_LONG_STR_LENGTH} and max ${MAX_LONG_STR_LENGTH} symbols`,
  },
  {
    name: `description`,
    required: true,
    predicates: [
      isStrWithinRange(MIN_LONG_STR_LENGTH, MAX_LONG_STR_LENGTH)
    ],
    message: `Address should be min ${MIN_LONG_STR_LENGTH} and max ${MAX_LONG_STR_LENGTH} symbols`,
  },
  {
    name: `price`,
    required: true,
    converter: convertToInt,
    predicates: [
      _.isFinite,
      isPositive,
    ],
    message: `Price should be number >= 0`,
  },
  {
    name: `type`,
    required: true,
    predicates: [
      (x) => _.includes(x, TYPES),
    ],
    message: `Type param should be one of type: ${TYPES}`,
  },
  {
    name: `rooms`,
    required: true,
    converter: convertToInt,
    predicates: [
      _.isFinite,
      isPositive,
    ],
    message: `Rooms should be number >= 0`,
  },
  {
    name: `guests`,
    required: true,
    converter: convertToInt,
    predicates: [
      _.isFinite,
      isPositive,
    ],
    message: `Guests should be number >= 0`,
  },
  {
    name: `checkin`,
    required: true,
    predicates: [
      (x) => _.includes(x, CHECKIN),
    ],
    message: `Checkin param should be one of: ${CHECKIN}`,
  },
  {
    name: `checkout`,
    required: true,
    predicates: [
      (x) => _.includes(x, CHECKOUT),
    ],
    message: `Checkout param should be one of type: ${CHECKOUT}`,
  },
  {
    name: `features`,
    required: true,
    converter: _.split(`,`),
    predicates: [
      compareArrays(FEATURES),
    ],
    message: `Features param should include only one of type: ${FEATURES}`,
  },
  {
    name: `avatar`,
    required: false,
    predicates: [
      isImage,
    ],
    message: `Avatar should be an image`,
  },
];

module.exports = {
  queryParamsSchema,
  offerSchema,
};
