const fs = require(`fs`);
const util = require(`util`);
const generateEntity = require(`../generate-entity`);

const writeFile = util.promisify(fs.writeFile);
const writeFileOptions = {
  mode: 0o644,
};

module.exports = {
  name: `generate`,
  description: `Generates sample data`,
  execute(filePath = `${process.cwd()}/hotel-data.json`) {
    const data = generateEntity();

    return writeFile(filePath, JSON.stringify(data), writeFileOptions)
        .then(() => {
          console.log(`Your file has ben saved`);
        })
        .catch((err) => {
          return console.log(`Error while generating sample data: ${err}`);
        });
  }
};
