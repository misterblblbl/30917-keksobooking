const request = require(`supertest`);

const {app} = require(`../app/commands/server`);

describe(`POST api/offers`, () => {
  const data = {
    name: `Pavel`,
    title: `Маленькая квартирка рядом с парком`,
    address: `102-0075 Tōkyō-to, Chiyoda-ku, Sanbanchō`,
    description: `Маленькая чистая квратира на краю парка. Без интернета, регистрации и СМС.`,
    price: 30000,
    type: `flat`,
    rooms: 1,
    guests: 1,
    checkin: `9:00`,
    checkout: `7:00`,
    features: [`elevator`, `conditioner`]
  };

  it(`should respond with sent json`, () => {
    return request(app)
        .post(`/api/offers`)
        .send(data)
        .expect(200, data);
  });
});

