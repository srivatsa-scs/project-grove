/* Package Imports */

const express = require('express');
const cors = require('cors');
const multer = require('multer');
const path = require('path');
const jwt = require('jsonwebtoken');
const rateLimit = require('express-rate-limit');
const slowDown = require('express-slow-down');
const morgan = require('morgan');
const helmet = require('helmet');

/* Local Imports */
const db = require('./database/psql.js');
const api = require('./api.js');
const { logger, userLogger } = require('./adapters/winston-adapter');
const fs = require('fs');

/* Local Setup */
const app = express();
const port = process.env.EXPRESS_PORT;
const rateLimiter = rateLimit({
  windowMs: process.env.RATE_LIMIT_MIN * 60 * 1000,
  max: process.env.RATE_LIMIT_MAX,
});
const speedLimiter = slowDown({
  windowMs: process.env.SPEED_LIMIT_MIN * 60 * 1000,
  delayAfter: process.env.SPEED_LIMIT_REQ,
  delayMs: process.env.SPEED_LIMIT_DELAY_MS,
});

/* Middleware */
app.use(cors());
app.use(express.json());
app.use('/api', api);
app.use(rateLimiter);
app.use(speedLimiter);

app.use(express.static('public'));

app.use(morgan('common', { stream: fs.createWriteStream(path.join('./logs/access/', 'access.log'), { flags: 'a' }) }));
app.use(helmet());

/* Hosting web server */

module.exports = app.listen(port, (err) => {
  if (err) {
    console.error(err);
  } else {
    logger.info(`Express server started at port: ${port}`);
  }
});

/* Multer Config */
/* Set directory for the images to be stored. */

const storage = multer.diskStorage({
  destination: './public/uploads/',
  filename: (req, file, next) => {
    next(null, `${Date.now()}_${file.originalname}`);
  },
});

const upload = multer({ storage: storage });

/* Verify Token Middleware */

function verifyToken(req, res, next) {
  if (!req.headers.authorization) {
    return res.status(401).send('Unauthorized Request');
  }
  let token = req.headers.authorization.split(' ')[1];
  if (token === 'null') {
    return res.status(401).send('Unauthorized Request');
  }
  try {
    let payload = jwt.verify(token, process.env.BCRYPT_SECRET);
    if (!payload) {
      return res.status(401).send('Unauthorized Request');
    }
    req.userId = payload.subject;
    next();
  } catch (err) {
    return res.status(401).send('Unauthorized Request');
  }
}

/* Output formatter Middleware */

function outputFormatter(req, res) {
  if (!res.reply) {
    res.status(403).send('Forbidden');
  } else if (res.reply.opSuccess) {
    res.status(200).send(res.reply);
  } else {
    res.status(204).send(res.reply);
  }
}

/* Express Methods */

/*
API "Docs"

/person/add -> add one person to database.
/person/get/all -> retrieve all people from the person table.
/person/update/one -> Updates information about one person

/relations/find/all -> retreive all relations from the relations table.
/relations/update/one -> update one relation from the relations table.
/relations/find/one -> get one 

*/

// app.get('/', rateLimiter, speedLimiter, (req, res, next) => {
//   res.status(403).send('');
// });

const imageHostBaseUrl = process.env.IMG_BASE_URL || 'http://server.grove.localhost';

/* Person Table APIs */

app.post('/person/add', rateLimiter, speedLimiter, verifyToken, async (req, res, next) => {
  if (req.body.value.imgPath == null) {
    req.body.value.imgPath = imageHostBaseUrl + '/uploads/static/default.png';
  }
  reply = await db.addPerson(req.body.value);
  res.reply = reply;
  if (reply.opSuccess) {
    userLogger.info(`User (${req.userId}) has created a new person (${reply.opContent.id})`);
  } else {
    userLogger.info(`User (${req.userId}) has failed to create a new person`);
  }
  next();
});

/* Image Upload API */

app.post('/person/image/upload', upload.single('image'), (req, res, next) => {
  const file = req.file;
  if (!file) {
    const error = new Error('Please upload an Image');
    error.httpStatusCode = 400;
    return next(error);
  } else {
    let imgPath = file.destination + file.filename;
    imgPath = imageHostBaseUrl + imgPath.substring(8);
    logger.info('New image uploaded');
    res.status(200).send({ imgPath: imgPath });
  }
});

/* Fetch Basic Info about people */

app.post('/person/get/all', rateLimiter, speedLimiter, verifyToken, async (req, res, next) => {
  reply = await db.getPersonAll();
  res.reply = reply;
  next();
});

/* Fetch All info about one person */

app.post('/person/find/one', rateLimiter, speedLimiter, verifyToken, async (req, res, next) => {
  let reply = await db.getPersonOne(req.body.value);
  res.reply = reply;
  next();
});

/* Update info about one person */

app.post('/person/update/one', rateLimiter, speedLimiter, verifyToken, async (req, res, next) => {
  reply = await db.updatePersonOne(req.body.value);
  res.reply = reply;
  if (reply.opSuccess) {
    userLogger.info(`User (${req.userId}) has updated the person (${req.body.value.id}) `);
  } else {
    userLogger.info(`User (${req.userId}) has failed to update the person (${req.body.value.id}) `);
  }
  next();
});

/* Relation Table APIs */

/* Updates Relations of One Person */

app.post('/relations/update/one', rateLimiter, speedLimiter, verifyToken, async (req, res, next) => {
  reply = await db.updateRelation(req.body.value);
  res.reply = reply;
  if (reply.opSuccess) {
    userLogger.info(`User (${req.userId}) has updated relations of the person (${req.body.value.person_id}) `);
  } else {
    userLogger.info(`User (${req.userId}) has failed to update relations of the person (${req.body.value.person_id}) `);
  }
  next();
});

/* Get Relation Info about one person */

app.post('/relations/find/one', rateLimiter, speedLimiter, verifyToken, async (req, res, next) => {
  reply = await db.getRelationOne(req.body.value);
  res.reply = reply;
  next();
});

/* Find relation between two people */

app.post('/relations/between', rateLimiter, speedLimiter, verifyToken, async (req, res, next) => {
  reply = await db.findRelationBetween(Number(req.body.value.per1), Number(req.body.value.per2));
  res.reply = reply;
  next();
});

/* Format response codes */

app.use(outputFormatter);

/* Catch All 403 */

app.get('*', (req, res) => {
  res.status(403).send();
});

app.post('*', (req, res) => {
  res.status(403).send();
});
