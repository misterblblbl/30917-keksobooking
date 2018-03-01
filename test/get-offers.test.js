const request = require(`supertest`);
const assert = require(`assert`);
const _ = require(`lodash/fp`);

const {app} = require(`../app/commands/server`);

describe(`GET api/offers`, () => {
  it(`should respond with json`, () => {
    return request(app)
        .get(`/api/offers`)
        .set(`Accept`, `application/json`)
        .expect(200)
        .expect(`Content-Type`, /json/)
        .then((res) => {
          const offers = res.body;
          assert.ok(_.has(`data`, offers));
        });
  });

  it(`should respond with 404 if adress is unknown`, () => {
    return request(app)
        .get(`/api/blah`)
        .set(`Accept`, `application/json`)
        .expect(404)
        .expect(`Content-Type`, /html/);
  });
});

