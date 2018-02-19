const AVATAR_URL = `https://robohash.org/`;

const TITLES = [
  `Большая уютная квартира`,
  `Маленькая неуютная квартира`,
  `Огромный прекрасный дворец`,
  `Маленький ужасный дворец`,
  `Красивый гостевой домик`,
  `Некрасивый негостеприимный домик`,
  `Уютное бунгало далеко от моря`,
  `Неуютное бунгало по колено в воде`,
];

const price = {
  MIN: 1000,
  MAX: 1000000,
};

const TYPES = [
  `flat`,
  `palace`,
  `house`,
  `bungalo`,
];

const rooms = {
  MIN: 1,
  MAX: 5,
};

const CHECKIN = [
  `12:00`,
  `13:00`,
  `14:00`,
];

const CHECKOUT = [
  `12:00`,
  `13:00`,
  `14:00`,
];

const FEATURES = [
  `wifi`,
  `dishwasher`,
  `parking`,
  `washer`,
  `elevator`,
  `conditioner`,
];

const PHOTOS = [
  `http://o0.github.io/assets/images/tokyo/hotel1.jpg`,
  `http://o0.github.io/assets/images/tokyo/hotel2.jpg`,
  `http://o0.github.io/assets/images/tokyo/hotel3.jpg`,
];

const locationX = {
  MIN: 300,
  MAX: 900,
};

const locationY = {
  MIN: 150,
  MAX: 500,
};

module.exports = {
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
};
