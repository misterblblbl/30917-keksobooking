const packageInfo = require(`../package.json`);

module.exports = {
  name: `--author`,
  description: `Prints program author`,
  execute() {
    console.log(`${packageInfo.author}`);
  }
};
