// eslint-disable-next-line no-unused-vars
const colors = require(`colors`);
const _ = require(`lodash/fp`);
const commands = require(`./commands`);

const args = process.argv.slice(2);
const cmd = args[0] || `--empty`;
const command = _.find({name: cmd.substring(2)}, commands);

if (!cmd.startsWith(`--`) || !command) {
  commands.error.execute(cmd);
  process.exit(1);
}

if (command.name === `help`) {
  command.execute(commands);
}

command.execute();


