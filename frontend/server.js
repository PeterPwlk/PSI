const PORT = process.env.PORT || 8080;
const express = require('express');
const history = require('connect-history-api-fallback');
const app = express();
const proxy = require('express-http-proxy');

app.use('/api', proxy(process.env.BACKEND_URL,{
  proxyReqPathResolver: function(req) {
    return `/api` + req.url
  }
}));

app.use(history());
app.use(express.static('dist'));
app.get('/', (req, res) => {
  res.sendFile('dist/index.html');
});

app.listen(PORT, () => console.log(`Server listening on port: ${PORT}`));
