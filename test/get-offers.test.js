const request = require(`supertest`);
const assert = require(`assert`);
const _ = require(`lodash/fp`);

const mockApiRouter = require(`./mock-api-router`);
const app = require(`express`)();

app.use(`/api`, mockApiRouter);

describe(`GET api/offers`, () => {
  it(`should respond with json`, () => {
    return request(app)
        .get(`/api/offers`)
        .set(`Accept`, `application/json`)
        .expect(200)
        .expect(`Content-Type`, /json/)
        .then((res) => {
          const offers = res.body;

          assert.equal(offers.total, 30);
          assert.ok(_.has(`data`, offers));
          assert.equal(offers.data.length, 20);
        });
  });

  it(`should respond with 400 if received skip param is invalid`, () => {
    return request(app)
        .get(`/api/offers?skip=-1&limit=30`)
        .set(`Accept`, `application/json`)
        .expect(400)
        .expect(`Content-Type`, /json/);
  });

  it(`should respond with 400 if received limit param is invalid`, () => {
    return request(app)
        .get(`/api/offers?skip=0&limit=meh`)
        .set(`Accept`, `application/json`)
        .expect(400)
        .expect(`Content-Type`, /json/);
  });

  it(`should respond with 404 if adress is unknown`, () => {
    return request(app)
        .get(`/api/blah`)
        .set(`Accept`, `application/json`)
        .expect(404)
        .expect(`Content-Type`, /html/);
  });
});

