const fs = require(`fs`);
const util = require(`util`);
const _ = require(`lodash/fp`);
const generateEntity = require(`../generate-entity`);

const writeFile = util.promisify(fs.writeFile);
const writeFileOptions = {
  mode: 0o644,
};

module.exports = {
  name: `generate`,
  description: `Сгенерировать тестовые данные`,
  execute(options) {
    const {filePath = `${process.cwd()}/hotel-data.json`, quantity} = options;
    const data = _.flow(
        _.range(0),
        _.map(generateEntity)
    )(quantity);

    return writeFile(filePath, JSON.stringify(data), writeFileOptions)
        .then(() => {
          console.log(`Данные сгенерированы: ${filePath}`);
        })
        .catch((err) => {
          return console.log(`Ошибка при генерации данных: ${err}`);
        });
  }
};
