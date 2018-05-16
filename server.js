const http = require('http');
const Url = require('url');
const config = require('./redirects.json');
const port = process.env.PORT || 80;

http.createServer(requestHandler).listen(port, listenerCallback);

function requestHandler(req, res) {
  const url = Url.parse(req.url);
  const redirect = config.redirects
    .find((r) => {
      return ((r.host && r.host == url.host) || !r.host)
        && ((r.path && r.path == url.path) || !r.path)
    });
  if (redirect) {
    const destination = redirect.destination || config.defaultDestination;
    const statusCode = redirect.status || 302;
    console.log(`${req.url} -> ${destination} status ${statusCode}`);
    res.writeHead(statusCode, { Location: destination });
  } else {
    console.log(`REDIRECT NOT FOUND: ${req.url} -> ${config.defaultDestination}`);
    res.writeHead(302, { Location: config.defaultDestination });
  }
}

function listenerCallback(error) {
  if (error) throw error;
  console.log(`Redirect server listening on port ${port}\r\n`);
}
