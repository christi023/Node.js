'use strict';

const fs = require('fs');

const read = function() {
  return new Promise(resolve =>
    fs.readFile('./toDoList.txt', 'UTF-8', (err, data) => {
      resolve(err ? '' : data);
    }),
  );
};

module.exports = read;
