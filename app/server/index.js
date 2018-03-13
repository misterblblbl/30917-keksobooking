const path = require(`path`);
const express = require(`express`);
const {apiRouter} = require(`./router`);
require(`../database`);

const app = express();
const staticDir = path.resolve(__dirname, `../../static/`);

app.use(`/api`, apiRouter);
app.use(express.static(staticDir));

app.use((exception, req, res, next) => {
  console.error(exception);
  res.status(500).send(`OOPS! Something went wrong`);
  next();
});

module.exports = {
  app
};

