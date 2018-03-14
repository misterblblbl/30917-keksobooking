require(`dotenv`).config();

const {app} = require(`../server`);
const {SERVER_PORT, SERVER_HOST} = process.env;

module.exports = {
  name: `server`,
  description: `Запускает сервер`,
  execute() {
    app.listen(SERVER_PORT, () => {
      console.log(`Server is running on ${SERVER_HOST}:${SERVER_PORT}`);
    });
  },
  app,
};
