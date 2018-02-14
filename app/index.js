// eslint-disable-next-line no-unused-vars
const colors = require(`colors`);
const commands = require(`./commands`);
const _ = require(`lodash/fp`);

const args = process.argv.slice(2);
const cmd = args[0] || `empty`;
const command = _.find({name: cmd}, commands);

if (!command) {
  commands.error.execute(cmd);
  process.exit(1);
}

command.execute();
process.exit();

