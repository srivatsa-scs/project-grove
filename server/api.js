const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
require('dotenv').config();

const User = require('./models/user');
const { logger, userLogger } = require('./adapters/winston-adapter');

const router = express.Router();
const saltRounds = 10;

mongoose.connect(process.env.DB_URI_2, { useNewUrlParser: true, useUnifiedTopology: true }, (err) => {
  if (err) {
    console.error(err);
    logger.error('Connection to MongoDB Failed // Log-in server is not live.');
  } else {
    logger.info('Connected to MongoDB // Log-in server is live');
  }
});

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

router.post('/register', async (req, res) => {
  let userData = req.body;
  if (Object.keys(userData) == 0) {
    return res.status(403).send('Unauthorized Request');
  }
  userData.password = await generateSaltNPepper(userData.password);
  let user = new User(userData);
  User.findOne({ email: userData.email }, async (err, docs) => {
    if (err) console.error(err);
    else {
      if (docs) {
        res.status(409).send('User already Exists');
      } else {
        user.save((err, reg) => {
          if (err) {
            console.log(err);
          } else {
            let payload = { subject: reg._id };
            let token = jwt.sign(payload, process.env.BCRYPT_SECRET, { expiresIn: process.env.JWT_TIMEOUT });
            userLogger.info(`New user registered ${reg._id}`);
            res.status(200).send({ token });
          }
        });
      }
    }
  });
});

router.post('/login', (req, res) => {
  let userData = req.body;
  User.findOne({ email: userData.email }, async (err, docs) => {
    if (err) console.error(err);
    else {
      if (!docs) {
        res.status(401).send('Invalid Email');
      } else {
        passCheck = await checkSaltNPepper(userData.password, docs.password);
        if (!passCheck) {
          res.status(401).send('Invalid Password');
        } else {
          let payload = { subject: docs._id };
          let token = jwt.sign(payload, process.env.BCRYPT_SECRET, { expiresIn: process.env.JWT_TIMEOUT });
          userLogger.info(`User logged in ${docs._id}`);
          res.status(200).send({ token });
        }
      }
    }
  });
});

router.post('/changepass', verifyToken, (req, res) => {
  let userData = {
    _id: req.userId,
    ...req.body,
  };
  User.findOne({ _id: userData._id }, async (err, docs) => {
    if (err) console.error(err);
    else {
      if (!docs) {
        res.status(401).send('Invalid Email');
      } else {
        oldPassCheck = await checkSaltNPepper(userData.oldPassword, docs.password);
        if (!oldPassCheck) {
          res.status(401).send('Invalid Password');
        } else {
          docs.password = await generateSaltNPepper(userData.newPassword);
          docs.save((err, reg) => {
            if (err) console.error(err);
            else {
              let payload = { subject: docs._id };
              let token = jwt.sign(payload, process.env.BCRYPT_SECRET, { expiresIn: process.env.JWT_TIMEOUT });
              userLogger.info(`User (${docs._id}) changed password`);
              res.status(200).send({ token });
            }
          });
        }
      }
    }
  });
});

router.get('*', (req, res) => {
  res.status(403).send();
});

router.post('*', (req, res) => {
  res.status(403).send();
});
async function generateSaltNPepper(pass) {
  let salt = await bcrypt.genSalt(saltRounds);
  let hash = await bcrypt.hash(pass, salt);
  return hash;
}

async function checkSaltNPepper(pass, hash) {
  return await bcrypt.compare(pass, hash);
}

module.exports = router;
