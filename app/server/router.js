const {Router} = require(`express`);
const bodyParser = require(`body-parser`);
// const multer = require(`multer`);
const _ = require(`lodash/fp`);
const generateEntity = require(`../generate-entity`);

const ValidationError = require(`./validation/error`);
const {queryParamsSchema} = require(`./validation/schema`);
const {validate} = require(`./validation`);

const offers = generateEntity(30);
const apiRouter = new Router();
// const upload = multer({ storage: multer.memoryStorage() });

apiRouter.use(bodyParser.json());
bodyParser.urlencoded({extended: true});

apiRouter.get(`/offers`, (req, res) => {
  const {skip: rawSkip = 0, limit: rawLimit = 20} = req.query;
  const skip = parseInt(rawSkip, 10);
  const limit = parseInt(rawLimit, 10);

  const errors = validate(queryParamsSchema, {
    skip,
    limit,
  });

  if (!_.isEmpty(errors)) {
    throw new ValidationError(errors);
  }

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

apiRouter.post(`/offers`, (req, res) => {
  const {body} = req;
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
