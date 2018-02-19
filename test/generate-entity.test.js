const assert = require(`assert`);
const _ = require(`lodash/fp`);
const {
  AVATAR_URL,
  TITLES,
  price,
  rooms,
  TYPES,
  CHECKIN,
  CHECKOUT,
  FEATURES,
  PHOTOS,
  locationX,
  locationY,
} = require(`../app/generate-entity/data`);
const generateEntity = require(`../app/generate-entity`);

describe(`GenerateEntity function`, () => {
  const data = generateEntity();
  describe(`should generate object containing`, () => {

    it(`author field `, () => assert.ok(_.has([`author`], data)));
    it(`offer field `, () => assert.ok(_.has([`offer`], data)));
    it(`location field `, () => assert.ok(_.has([`location`], data)));
  });

  describe(`should contain an author field`, () => {
    it(`with avatar field containing a URL`, () => {
      const avatarUrl = _.get([`author`, `avatar`], data);

      assert.ok(_.startsWith(AVATAR_URL, avatarUrl));
    });
  });

  describe(`should contain offer field`, () => {
    it(`with title from one of predefined items`, () => {
      const title = _.get([`offer`, `title`], data);
      assert.ok(_.includes(title, TITLES));
    });

    it(`with address field containing a stringified location`, () => {
      const address = _.get([`offer`, `address`], data);
      const location = _.get(`location`, data);

      assert.equal(address, `${location.x}, ${location.y}`);
    });

    it(`with price within specified range`, () => {
      const generatedPrice = _.get([`offer`, `price`], data);
      assert.ok(generatedPrice >= price.MIN && generatedPrice <= price.MAX);
    });

    it(`with rooms number within specified range`, () => {
      const generatedRooms = _.get([`offer`, `rooms`], data);
      assert.ok(generatedRooms >= rooms.MIN && generatedRooms <= rooms.MAX);
    });

    it(`with type field containig one of specified values`, () => {
      const generatedType = _.get([`offer`, `type`], data);
      assert.ok(_.includes(generatedType, TYPES));
    });

    it(`with guests field containing a number`, () => {
      const guests = _.get([`offer`, `guests`], data);
      assert.ok(_.isNumber(guests));
    });

    it(`with checkin containig one of specified values`, () => {
      const checkin = _.get([`offer`, `checkin`], data);
      assert.ok(_.includes(checkin, CHECKIN));
    });

    it(`with checkout containig one of specified values`, () => {
      const checkout = _.get([`offer`, `checkout`], data);
      assert.ok(_.includes(checkout, CHECKOUT));
    });

    it(`with features array containig specified values in random order`, () => {
      const features = _.get([`offer`, `features`], data);
      assert.equal(_.intersection(features, FEATURES).length, features.length);
    });

    it(`with description as empty string`, () => {
      const description = _.get([`offer`, `description`], data);
      assert.equal(description, ``);
    });

    it(`with photos array randomly sorted`, () => {
      const photos = _.get([`offer`, `photos`], data);
      assert.equal(_.union(photos, PHOTOS).length, PHOTOS.length);
    });
  });

  describe(`should contain a location field`, () => {
    it(`with x within specified range`, () => {
      const x = _.get([`location`, `x`], data);

      assert.ok(x >= locationX.MIN && x <= locationX.MAX);
    });

    it(`with y within specified range`, () => {
      const y = _.get([`location`, `y`], data);

      assert.ok(y >= locationY.MIN && y <= locationY.MAX);
    });
  });
});
