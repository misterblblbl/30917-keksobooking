const path = require(`path`);
const express = require(`express`);

const PORT = 3000;

const app = express();
const staticDir = path.resolve(__dirname, `../../static/`);
app.use(express.static(staticDir));

module.exports = {
  name: `server`,
  description: `Запускает сервер`,
  execute() {
    app.listen(3000, () => {
      console.log(`Server is running on localhost:${PORT}`);
    });
  }
};
