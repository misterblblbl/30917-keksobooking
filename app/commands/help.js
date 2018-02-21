const _ = require(`lodash/fp`);

module.exports = {
  name: `help`,
  description: `Prints possible commands`,
  execute(commands) {
    console.log(`${
      _.flow(
          _.omit([`error`, `empty`]),
          _.map((c) => (`--${c.name.padEnd(15).gray} – ${c.description.green}`)),
          _.join(`\n`)
      )(commands)
    }`);
  }
};
