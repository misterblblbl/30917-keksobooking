const db = require(`./index`);

const setupCollection = async () => {
  const database = await db;
  const collection = database.collection(`offers`);

  return collection;
};

class OffersStore {
  constructor(collection) {
    this.collection = collection;
  }

  async getOffer(date) {
    return (await this.collection).findOne({date});
  }

  async getAllOffers() {
    return (await this.collection).find();
  }

  async save(offer) {
    return (await this.collection).insertOne(offer);
  }

  async saveMany(offers) {
    return (await this.collection).insertMany(offers);
  }
}

const collection = setupCollection(db)
    .catch((e) => console.error(`Failed to set up offers collection`, e));

module.exports = new OffersStore(collection);
