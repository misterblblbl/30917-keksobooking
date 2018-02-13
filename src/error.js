module.exports = {
  name: `error`,
  description: `Logs error`,
  execute(command) {
    console.error(`
      Неизвестная команда ${command.red}.
      Чтобы прочитать правила использования приложения, наберите ${`--help`.green}
    `);
  }
};
