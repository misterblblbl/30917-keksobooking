const args = process.argv.slice(2);

if (args.length === 0) {
  console.log(`
      Привет пользователь!
      Эта программа будет запускать сервер «Keksobooking».
      Автор: Алесандра Годун.
    `);
  process.exit();
}

switch (args[0]) {
  case `--help`:
    console.log(`
      Доступные команды:
        --help    — печатает этот текст;
        --version — печатает версию приложения;
    `);
    process.exit();
    break;

  case `--version`:
    console.log(`v0.0.1`);
    process.exit();
    break;

  default:
    console.error(`
      Неизвестная команда ${args[0]}.
      Чтобы прочитать правила использования приложения, наберите "--help"
    `);
    process.exit(1);
    break;
}
