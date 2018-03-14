const path = require(`path`);
const express = require(`express`);
const OffersStore = require(`../database/offers-store`);
const ImageStore = require(`../database/image-store`);
const apiRouter = require(`./router`)(OffersStore, ImageStore);
require(`../database`);

const app = express();
const staticDir = path.resolve(__dirname, `../../static/`);

app.use(`/api`, apiRouter);
app.use(express.static(staticDir));

module.exports = {
  app
};

