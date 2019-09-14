'use strict';

// TODO: Write the homework code in this file
'use strict';

const reset = require('./reset');
const append = require('./add');
const read = require('./list');
const remove = require('./remove');
const help = require('./help');

switch (process.argv[3]) {
  case 'help':
  case '/':
  default:
    help();
    break;

  case 'list':
    read().then(data => {
      //let items = JSON.parse(data);

      console.log(`Things to do:\n${data}`);
    });
    break;

  case 'add':
    //let toDoList = JSON.parse(data);
    //let itemsAdd = { item: process.argv.slice(3) };
    append(...process.argv.slice(4))
      .then(() => read())
      .then(data => {
        console.log(`Item ${process.argv[4]} added`);
        console.log(`\nThings to do:\n${data}`);
      })
      .catch(console.error);
    break;

  case 'remove':
    const index = process.argv[4];
    remove(index);
    read().then(data => {
      console.log(`Things to do:\n${data}`);
    });
    break;

  case 'reset':
    reset();
    read().then(data => {
      console.log(`Things to do:\n${data}`);
    });
    break;
}
