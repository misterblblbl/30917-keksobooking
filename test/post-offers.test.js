const request = require(`supertest`);
const assert = require(`assert`);
const _ = require(`lodash/fp`);

const mockApiRouter = require(`./mock-api-router`);
const app = require(`express`)();

app.use(`/api`, mockApiRouter);

describe(`POST api/offers`, () => {
  const data = {
    name: `Pavel`,
    title: `Маленькая квартирка рядом с парком`,
    address: `102-0075 Tōkyō-to, Chiyoda-ku, Sanbanchō`,
    description: `Маленькая чистая квратира на краю парка. Без интернета, регистрации и СМС.`,
    price: `3000`,
    type: `flat`,
    rooms: `1`,
    guests: `1`,
    checkin: `12:00`,
    checkout: `12:00`,
    features: `elevator`
  };

  it(`should respond with sent json`, () => {
    return request(app)
        .post(`/api/offers`)
        .set(`Accept`, `application.json`)
        .field(`name`, `Pavel`)
        .field(`title`, `Маленькая квартирка рядом с парком`)
        .field(`address`, `102-0075 Tōkyō-to, Chiyoda-ku, Sanbanchō`)
        .field(`description`, `Маленькая чистая квратира на краю парка. Без интернета, регистрации и СМС.`)
        .field(`type`, `flat`)
        .field(`price`, `3000`)
        .field(`rooms`, `1`)
        .field(`guests`, `1`)
        .field(`checkin`, `12:00`)
        .field(`checkout`, `12:00`)
        .field(`features`, `elevator`)
        .expect(200)
        .then((res) => {
          const body = res.body;
          assert.deepEqual(_.omit(`date`, body), data);
        });
  });

  it(`should respond 400 error if data is inValid`, () => {
    return request(app)
        .post(`/api/offers`)
        .set(`Accept`, `application.json`)
        .field(`name`, `P`)
        .field(`title`, `Маленькая квартирка рядом с парком`)
        .expect(400);
  });
});

