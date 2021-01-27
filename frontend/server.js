const PORT = process.env.PORT || 8080;
const express = require('express');
const history = require('connect-history-api-fallback');
const app = express();
app.use(history());
app.use(express.static('dist'));
app.get('/', (req, res) => {
  res.sendFile('dist/index.html');
});
app.listen(PORT, () => console.log(`Server listening on port: ${PORT}`));
