const {Router} = require(`express`);
const bodyParser = require(`body-parser`);
const multer = require(`multer`);
const _ = require(`lodash/fp`);

const OffersStore = require(`../database/store`);
const ValidationError = require(`./validation/error`);
const {queryParamsSchema, offerSchema} = require(`./validation/schema`);
const {validate} = require(`./validation`);

const apiRouter = new Router();
const upload = multer({storage: multer.memoryStorage()});

const getPage = async (cursor, skip, limit) => {
  return {
    data: await (cursor.skip(skip).limit(limit).toArray()),
    skip,
    limit,
    total: await cursor.count()
  };
};

apiRouter.use(bodyParser.json());
bodyParser.urlencoded({extended: true});

apiRouter.get(`/offers`, async (req, res) => {
  const {skip = 0, limit = 20} = req.query;

  const errors = validate(queryParamsSchema, {
    skip,
    limit,
  });

  if (!_.isEmpty(errors)) {
    throw new ValidationError(errors);
  }

  const data = await OffersStore.getAllOffers();

  res.send(await getPage(data, parseInt(skip, 10), parseInt(limit, 10)));
});

apiRouter.get(`/offers/:date`, async (req, res) => {
  const date = _.get(`params.date`, req);
  const {skip = 0, limit = 20} = req.query;

  const errors = validate(queryParamsSchema, {
    skip,
    limit,
  });

  if (!_.isEmpty(errors)) {
    throw new ValidationError(errors);
  }

  const data = await OffersStore.getOffersByDate(parseInt(date, 10));

  res.send(await getPage(data, parseInt(skip, 10), parseInt(limit, 10)));
});

apiRouter.post(`/offers`, upload.single(`avatar`), (req, res) => {
  const {body} = req;
  const {file: avatar} = req;
  const data = _.assign(body, {avatar});
  const errors = validate(offerSchema, data);

  if (errors.length > 0) {
    throw new ValidationError(errors);
  }

  res.send(body);
});

apiRouter.use((exception, req, res, next) => {
  let data = exception;
  if (exception instanceof ValidationError) {
    data = exception.errors;
  }
  res.status(400).send(data);
  next();
});

module.exports = {
  apiRouter
};
