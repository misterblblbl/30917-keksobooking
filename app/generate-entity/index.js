const _ = require(`lodash/fp`);
const {
  AVATAR_URL,
  TITLES,
  price,
  TYPES,
  rooms,
  CHECKIN,
  CHECKOUT,
  FEATURES,
  PHOTOS,
  locationX,
  locationY,
} = require(`./data`);

const MAX_GUESTS = 2;

const generateRandomString = () => Math.random().toString(36).substring(7);

const generateRandomNumber = (min, max) => _.random(min, max);

const selectRandomItem = (src) => {
  const index = _.random(0, src.length - 1);
  return src[index];
};

const shuffleArray = (src) => {
  const entityNumber = _.random(1, src.length);
  return _.flow(
      _.shuffle,
      _.take(entityNumber)
  )(src);
};

const generateDate = () => {
  return Date.now() - generateRandomNumber(0, 30) * 3600 * 24;
};

const entityLocation = {
  x: generateRandomNumber(locationX.MIN, locationX.MAX),
  y: generateRandomNumber(locationY.MIN, locationY.MAX)
};

const generateEntity = () => {
  return {
    author: {
      avatar: `${AVATAR_URL}${generateRandomString()}`,
    },
    offer: {
      address: `${entityLocation.x}, ${entityLocation.y}`,
      price: generateRandomNumber(price.MIN, price.MAX),
      type: selectRandomItem(TYPES),
      title: selectRandomItem(TITLES),
      rooms: generateRandomNumber(rooms.MIN, rooms.MAX),
      guests: generateRandomNumber(rooms.MIN, rooms.MAX * MAX_GUESTS),
      checkin: selectRandomItem(CHECKIN),
      checkout: selectRandomItem(CHECKOUT),
      features: shuffleArray(FEATURES),
      description: ``,
      photos: _.shuffle(PHOTOS),
    },
    location: {
      x: entityLocation.x,
      y: entityLocation.y,
    },
    date: generateDate(),
  };
};

module.exports = (quantity) => {
  return _.flow(
      _.range(0),
      _.map(generateEntity)
  )(quantity);
};
