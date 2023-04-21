const express = require('express');
const app = express();
const port = 3000;
const hostname = "127.0.0.1"

app.use(express.json());
app.use(express.static('public'));

const indexRouter = require('./routes/index');

app.use('/', indexRouter);

app.listen(port, () => {
  console.log(`Serveur Express démarré sur le port http://${hostname}:${port}`);
});
