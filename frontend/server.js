const { readFileSync } = require('fs');
const express = require('express');
const http = require('http');
const https = require('https');
const history = require('connect-history-api-fallback');
const proxy = require('express-http-proxy');

const PORT = process.env.PORT || 8080;

const certs = {
  key: readFileSync(process.env.SSL_KEY, 'utf-8'),
  cert: readFileSync(process.env.SSL_CERT, 'utf-8'),
};

const app = express();

app.use(
  '/api',
  proxy(process.env.BACKEND_URL, {
    proxyReqPathResolver: function(req) {
      return `/api` + req.url;
    },
  })
);

app.use(history());
app.use(express.static('dist'));
app.get('/', (req, res) => {
  res.sendFile('dist/index.html');
});

const server = process.env.SSL
  ? https.createServer(certs, app)
  : http.createServer(app);

server.listen(PORT, () => console.log(`Server listening on port: ${PORT}`));
