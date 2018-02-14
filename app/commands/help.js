module.exports = {
  name: `--help`,
  description: `Prints possible commands`,
  execute() {
    console.log(`
      Доступные команды:
      --${`help`.gray}        — ${`печатает этот текст`.green}
      --${`version`.gray}     — ${`печатает версию приложения`.green}
      --${`author`.gray}      — ${`печатает имя автора приложения`.green}
      --${`description`.gray} — ${`печатает описание`.green}
      --${`license`.gray}     — ${`печатает информацию о лицензии`.green}
    `);
  }
};
