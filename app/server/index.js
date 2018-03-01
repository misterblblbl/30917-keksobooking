const path = require(`path`);
const express = require(`express`);
const {apiRouter} = require(`./router`);

const app = express();
const staticDir = path.resolve(__dirname, `../../static/`);

app.use(`/api`, apiRouter);
app.use(express.static(staticDir));

module.exports = {
  app
};

