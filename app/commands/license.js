const packageInfo = require(`../../package.json`);

module.exports = {
  name: `--license`,
  description: `Prints program license`,
  execute() {
    console.log(`${packageInfo.license} License`);
  }
};
