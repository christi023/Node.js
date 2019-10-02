'use strict';

const fs = require('fs');
const uuid = require('uuid/vd');
const list = {};
const STORE_FILE_NAME = 'toDoList.txt';

function writeFile(data) {
  return new Promise((resolve, reject) =>
    fs.writeFile(STORE_FILE_NAME, JSON.stringify(data), (err, data) =>
      err ? reject(err) : resolve(data),
    ),
  );
}

function readTodos() {
  return new Promise(resolve =>
    fs.readFile(STORE_FILE_NAME, 'UTF-8', (err, data) => {
      resolve(err ? [] : JSON.parse(data.toString()));
    }),
  );
}

module.exports = {
  writeFile,
  readTodos,
};
