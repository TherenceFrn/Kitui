const express = require('express');
const app = express();
const port = process.env.PORT || 3001 ;
const hostname = "127.0.0.1"
const cors = require('cors');

require('dotenv').config()


app.use(express.json());
app.use(express.static('public'));
app.use(cors());

const indexRouter = require('./routes/index');

app.use('/', indexRouter);

app.listen(port, () => {
  console.log(`Serveur Express démarré sur le port http://${hostname}:${port}`);
});
