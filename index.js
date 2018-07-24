const http = require('http');
const url = require('url');

const HTTP_PORT = 3000;
const httpStatusCodes = {
  NOT_FOUND: 404,
  OK: 200
};

const HELLO_PAYLOAD = `{ message: 'welcome!'}`;

const notFoundHandler = (_, res) => {
  res.writeHead(httpStatusCodes.NOT_FOUND);
  res.end();
};

const helloHandler = (_, res) => {
  res.setHeader('Content-Type', 'application/json');
  res.writeHead(httpStatusCodes.OK);
  res.end(HELLO_PAYLOAD);
};

const requestHandler = (req, res) => {
  const { pathname } = url.parse(req.url, true);
  const resource =
    typeof pathname === 'string' ? pathname.replace(/^\/+|\/+$/g, '') : '';
  const specificHandler = handlers[resource] || notFoundHandler;
  specificHandler(req, res);
};

const handlers = {
  hello: helloHandler
};

const httpServer = http.createServer(requestHandler);
httpServer.listen(HTTP_PORT, () => {
  console.log(`Server listening on port ${HTTP_PORT}.`);
});
