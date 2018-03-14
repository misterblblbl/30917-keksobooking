const {Router} = require(`express`);
const bodyParser = require(`body-parser`);
const multer = require(`multer`);
const _ = require(`lodash/fp`);

const {createStreamFromBuffer} = require(`../database/utils`);
const catchErrors = require(`./error/handler`);
const ValidationError = require(`./error/validation`);
const NotFoundError = require(`./error/not-found`);
const {queryParamsSchema, offerSchema} = require(`./validation/schema`);
const {validate} = require(`./validation`);
const logger = require(`../logger`);

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
apiRouter.use((req, res, next) => {
  res.header(`Access-Control-Allow-Origin`, `*`);
  res.header(`Access-Control-Allow-Headers`, `Origin, X-Requested-With, Content-Type, Accept`);
  next();
});

bodyParser.urlencoded({extended: true});

apiRouter.get(`/offers`, catchErrors(async (req, res) => {
  logger.info(`Incoming GET-request to ${req.originalUrl} with params: ${JSON.stringify(req.query)}`);

  const {skip = 0, limit = 20} = req.query;
  const errors = validate(queryParamsSchema, {
    skip,
    limit,
  });

  if (!_.isEmpty(errors)) {
    throw new ValidationError(errors);
  }

  const data = await apiRouter.offersStore.getAllOffers();

  res.send(await getPage(data, parseInt(skip, 10), parseInt(limit, 10)));
}));

apiRouter.get(`/offers/:date`, catchErrors(async (req, res) => {
  logger.info(`Incoming GET-request to ${req.originalUrl}`);

  const date = _.get(`params.date`, req);
  const offer = await apiRouter.offersStore.getOffer(parseInt(date, 10));

  if (!offer) {
    throw new NotFoundError(`Offer with date "${date}" was not found`);
  }

  res.send(offer);
}));

apiRouter.get(`/offers/:date/avatar`, catchErrors(async (req, res) => {
  logger.info(`Incoming GET-request to ${req.originalUrl}`);

  const date = _.flow(
      _.get(`params.date`),
      (x) => parseInt(x, 10)
  )(req);

  const offer = await apiRouter.offersStore.getOffer(parseInt(date, 10));
  if (!offer) {
    throw new NotFoundError(`Offer with date "${date}" was not found`);
  }

  const avatar = _.get(`avatar`, offer);
  if (!avatar) {
    throw new NotFoundError(`Author of the offer didn't upload avatar`);
  }

  const {info, stream} = await apiRouter.imageStore.get(avatar.path);
  if (!info) {
    throw new NotFoundError(`File was not found`);
  }

  res.set(`content-type`, avatar.mimetype);
  res.set(`content-length`, info.length);
  res.status(200);
  stream.pipe(res);
}));

apiRouter.post(`/offers`, upload.single(`avatar`), catchErrors(async (req, res) => {
  const {body} = req;
  const {file: avatar} = req;
  const date = Date.now();
  const data = _.assign(body, {avatar, date});
  const errors = validate(offerSchema, data);

  logger.info(`Received data from user: `, data);

  if (errors.length > 0) {
    throw new ValidationError(errors);
  }

  if (avatar) {
    const avatarInfo = {
      path: `/api/wizards/${date}/avatar`,
      mimetype: avatar.mimetype
    };

    await apiRouter.imageStore.save(avatarInfo.path, createStreamFromBuffer(avatar.buffer));
    data.avatar = avatarInfo;
  }

  await apiRouter.offersStore.save(data);
  res.send(data);
}));

apiRouter.use((exception, req, res, next) => {
  let data = exception;
  let statusCode = 500;

  if (exception instanceof ValidationError) {
    data = exception.errors;
    statusCode = 400;
  }

  if (exception instanceof NotFoundError) {
    data = exception.errors;
    statusCode = 404;
  }

  logger.error(`Router exception caught: `, exception);
  res.status(statusCode).send({error: data});
  next();
});

module.exports = (offersStore, imageStore) => {
  apiRouter.offersStore = offersStore;
  apiRouter.imageStore = imageStore;

  return apiRouter;
};
