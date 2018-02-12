module.exports = {
  name: `--help`,
  description: `Prints possible commands`,
  execute() {
    console.log(`
      Доступные команды:
      --help        — печатает этот текст;
      --version     — печатает версию приложения;
      --author      — печатает имя автора приложения;
      --description — печатает описание;
      --license     — печатает информацию о лицензии;
    `);
  }
};
