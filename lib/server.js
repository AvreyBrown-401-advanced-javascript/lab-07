'use strict';

const express = require('express');

const app = express();

let db = [];

app.use(express.json());

function errorHandler(status) {
  return function (request, response) {
    response.status(status);
    response.send('Error found');
  };
}
function timeStamp(request, response, next) {

  return function logAndTime(request, response, message, next) {
    request.requestTime = Math.floor(Date.now() / 1000);
    next();
    request.message = 'My Fancy Message';
    console.log(`${request.path} ${request.method}  ${request.requestTime} ${request.message}`);
    next();

  }
}

// function logger(request, response, message, next) {
// }


// Route to Get All Categories
app.get('/categories', timeStamp, logger,  (req, res, next) => {
  let count = db.length;
  let results = db;
  res.json({ count, results });
});

// Route to Create a Category
app.post('/categories', timeStamp, logger,  (req, res, next) => {
  let record = req.body;
  record.id = Math.random();
  db.push(record);
  res.json(record);
});

// app.listen(PORT, () => console.log(`Listening on ${PORT}`));


app.use(errorHandler(404));

module.exports = {
  app,
  start: (PORT) => {
    app.listen(PORT || process.env.PORT || 3000, () => {
      console.log(`Server listening`);
    });
  },
};
