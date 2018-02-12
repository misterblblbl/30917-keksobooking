const help = require(`./src/help`);
const author = require(`./src/author`);
const description = require(`./src/description`);
const license = require(`./src/license`);
const version = require(`./src/version`);
const error = require(`./src/error`);
const emptyCommand = require(`./src/empty`);

const args = process.argv.slice(2);
const cmd = args[0];
const commands = {
  [help.name]: help.execute,
  [author.name]: author.execute,
  [description.name]: description.execute,
  [license.name]: license.execute,
  [version.name]: version.execute,
};

if (args.length === 0) {
  emptyCommand.execute();
  process.exit();
}

if (!commands[cmd]) {
  error.execute(cmd);
  process.exit(0);
}

commands[cmd]();
process.exit();

