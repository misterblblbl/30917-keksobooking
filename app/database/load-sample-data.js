const OffersStore = require(`./store`);
const generateEntity = require(`../generate-entity`);

const insertSampleCollection = async () => {
  const offers = generateEntity(30);

  return OffersStore.saveMany(offers);
};

insertSampleCollection()
    .then((result) => {
      console.log(`Data was successfully generated `, result);
      process.exit(0);
    })
    .catch((e) => console.log(`Error while inserting data into collection`, e));
