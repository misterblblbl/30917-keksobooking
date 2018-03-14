const createApiRouter = require(`../app/server/router`);
const generateEntity = require(`../app/generate-entity`);

const offers = generateEntity(30);

class Cursor {
  constructor(data) {
    this.data = data;
  }

  skip(count) {
    return new Cursor(this.data.slice(count));
  }

  limit(count) {
    return new Cursor(this.data.slice(0, count));
  }

  async count() {
    return this.data.length;
  }

  async toArray() {
    return this.data;
  }
}

class MockOffersStore {
  constructor() {}

  async getOffer(username) {
    return offers.find((it) => it.name.toLowerCase() === username);
  }

  async getAllOffers() {
    return new Cursor(offers);
  }

  async save() {}

  async saveMany() {}
}

class MockImageStore {
  async getBucket() {}

  async get() {}

  async save() {}
}

module.exports = createApiRouter(new MockOffersStore(), new MockImageStore());
