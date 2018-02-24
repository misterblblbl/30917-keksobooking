const readline = require(`readline`);
const fs = require(`fs`);
const _ = require(`lodash/fp`);

const generateData = require(`./generate`);

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const askToGenerateData = () => {
  return new Promise((resolve, reject) => {
    rl.question(`Хотите сгенерировать данные (y/n)? `, (answer) => {
      if (answer.toLowerCase() === `y`) {
        return resolve();
      }

      return reject(`Пользователь отказался генерировать данные`);
    });
  });
};

const askQuantity = () => {
  return new Promise((resolve, reject) => {
    rl.question(`Укажите сколько элементов надо создать `, (answer) => {
      const quantity = Math.abs(parseInt(answer, 10));

      if (_.isFinite(quantity)) {
        return resolve({quantity});
      }

      return reject(`Вы ввели не число`);
    });
  });
};

const askFilePath = (options) => {
  return new Promise((resolve) => {
    rl.question(`Укажите путь до файла, в котором сохранить данные `, (path) => {
      const filePath = `${path}/hotel-data.json`;

      return resolve(_.assign({filePath}, options));
    });
  });
};

const checkFileExists = (options) => {
  const {filePath} = options;

  return new Promise((resolve, reject) => {
    fs.stat(filePath, (err) => {
      if (!err) {
        return rl.question(`Файл уже существует, перезаписать (y/n)? `, (answer) => {
          if (answer.toLowerCase() === `y`) {
            return resolve(options);
          }

          return reject(`Запись файла отменена`);
        });
      }

      return resolve(options);
    });

  });
};

module.exports = {
  name: `empty`,
  description: `Prints possible commands`,
  execute() {
    console.log(`
      Привет пользователь!
      Эта программа будет запускать сервер «Keksobooking».
      Автор: ${`Алесандра Годун`.red}.
    `);

    askToGenerateData()
        .then(askQuantity)
        .then(askFilePath)
        .then(checkFileExists)
        .then((options) => {
          generateData.execute(options);
          return rl.close();
        })
        .catch((err) => {
          console.error(err);
          rl.close();
        });
  }
};
