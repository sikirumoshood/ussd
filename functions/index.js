const functions = require('firebase-functions');
const bodyParser = require('body-parser');
const alertHandler = require('./ussd.alert');
const express = require('express');
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.post('/alert', alertHandler);


exports.ussd = functions.https.onRequest(app);