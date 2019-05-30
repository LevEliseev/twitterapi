const express = require('express');
const bodyParser = require('body-parser');
const MongoClient = require('mongodb').MongoClient;
const path = require('path');
const request = require('request');
const cheerio = require('cheerio');
require('dotenv').config();

const app = express();
const port = process.env.PORT;
const dbUrl = process.env.DB_URL;
const dbName = process.env.DB_NAME;
const mongoClient = new MongoClient(dbUrl, { useNewUrlParser: true });

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static('public'));

mongoClient.connect((err, client) => {
    if (err) throw err;
    console.log('Connected successfully to server');

    const db = client.db(dbName);

    require('./routes/routes')(app, path, db, request, cheerio);
});

app.listen(port);