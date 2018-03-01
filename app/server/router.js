const {Router} = require(`express`);
const bodyParser = require(`body-parser`);
const _ = require(`lodash/fp`);
const generateEntity = require(`../generate-entity`);

const offers = generateEntity(30);
const apiRouter = new Router();

apiRouter.use(bodyParser.json());

apiRouter.get(`/offers`, (req, res) => {
  const {skip = 0, limit = 20} = req.query;
  const data = _.slice(skip, limit, offers);

  res.send({
    data,
    skip,
    limit,
    total: data.length,
  });
});

apiRouter.get(`/offers/:date`, (req, res) => {
  const date = _.get(`params.date`, req);
  const {skip = 0, limit = 20} = req.query;
  const data = _.flow(
      _.filter({date: _.parseInt(10, date)}),
      _.slice(skip, limit),
  )(offers);

  res.send({
    data,
    skip,
    limit,
    total: data.length,
  });
});

module.exports = {
  apiRouter
};
