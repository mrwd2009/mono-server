require('dotenv').config();
const express = require('express');
const compression = require('compression');
const cors = require('cors');
const serveStatic = require('serve-static');
const helmet = require('helmet');
const path = require('path');

const port = process.env.PORT || 8010;
const app = express();
const staticPath = path.resolve(__dirname, '../build');

app.use(helmet());
app.use(compression());
app.use(cors({
  origin: true, // Access-Control-Allow-Origin: *
  optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
}));

app.use(serveStatic(staticPath));
app.get('/healthcheck', (req, res) => res.status(200).send({ status: 200 }));
app.all('*', (req, res) => res.sendFile(path.resolve(__dirname, '../build/index.html')));

app.listen(port, (error) => {
  if (error) {
    console.error(error);
  } else {
    console.log(`Static server launched at port ${port}`);
  }
});
