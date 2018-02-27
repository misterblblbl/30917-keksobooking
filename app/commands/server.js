const http = require(`http`);
const url = require(`url`);
const fs = require(`fs`);
const path = require(`path`);
const util = require(`util`);

const HOSTNAME = `localhost`;
const PORT = 3000;
const EXTENSIONS = {
  '.css': `text/css`,
  '.html': `text/html; charset=UTF-8`,
  '.jpg': `image/jpeg`,
  '.png': `image/png`,
  '.ico': `image/x-icon`,
};

const readFile = util.promisify(fs.readFile);

const sendResponse = async (req, res) => {
  try {
    const {pathname} = url.parse(req.url);
    const staticDir = path.resolve(__dirname, `../../static/`);
    const filePath = (pathname === `/`) ?
      `${staticDir}/index.html` :
      `${staticDir}${pathname}`;

    const data = await readFile(filePath);
    const ext = path.extname(filePath);

    res.setHeader(`Content-type`, EXTENSIONS[ext]);
    res.statusCode = 200;
    res.statusMessage = `OK`;

    res.end(data);
  } catch (err) {
    res.writeHead(500, `Internal Server Error`, {
      'Content-type': `text/plain`
    });
    res.end(`OOPS! Something went wrong`);
  }
};

const server = http.createServer(sendResponse);

module.exports = {
  name: `server`,
  description: `Запускает сервер`,
  execute() {
    server.listen(PORT, HOSTNAME, () => {
      console.log(`Server is running on ${HOSTNAME}:${PORT}`);
    });
  }
};
