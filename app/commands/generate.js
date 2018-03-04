const fs = require(`fs`);
const util = require(`util`);
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

    return writeFile(filePath, JSON.stringify(generateEntity(quantity)), writeFileOptions)
        .then(() => {
          console.log(`Данные сгенерированы: ${filePath}`);
        })
        .catch((err) => {
          return console.log(`Ошибка при генерации данных: ${err}`);
        });
  }
};
