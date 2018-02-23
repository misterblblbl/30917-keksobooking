const assert = require(`assert`);
const fs = require(`fs`);
const {promisify} = require(`util`);
const generateCommand = require(`../app/commands/generate`);

const access = promisify(fs.access);
const unlink = promisify(fs.unlink);

describe(`Generate command`, () => {
  it(`should create new file`, () => {
    const filePath = `${__dirname}/testfile.json`;
    const options = {
      filePath,
      quantity: 3,
    };

    generateCommand.execute(options)
        .then(access(filePath))
        .then(unlink(filePath));
  });

  it(`should fail if folder doesn't exist`, () => {
    const filePath = `${__dirname}/nonexistent/testfile.json`;
    const options = {
      filePath,
      quantity: 3,
    };

    return generateCommand.execute(options).then(() => {
      assert.fail(`Path ${filePath} should not be available`);
    }).catch((e) => assert.ok(e));
  });
});
