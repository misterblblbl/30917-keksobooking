const {app} = require(`../server`);

const PORT = 3000;

module.exports = {
  name: `server`,
  description: `Запускает сервер`,
  execute() {
    app.listen(PORT, () => {
      console.log(`Server is running on localhost:${PORT}`);
    });
  },
  app,
};
