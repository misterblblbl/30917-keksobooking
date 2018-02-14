module.exports = {
  name: `empty`,
  description: `Prints possible commands`,
  execute() {
    console.log(`
      Привет пользователь!
      Эта программа будет запускать сервер «Keksobooking».
      Автор: ${`Алесандра Годун`.red}.
    `);
  }
};
