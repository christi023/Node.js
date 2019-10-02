'use strict';

// TODO: Write the homework code in this file
const express = require('express');
const app = express();
const uuidv4 = require('uuid/v4');
const { writeFile, readTodos } = require('./functions');

app.use(express.json()); // middleware that returns function

app.get('/', (req, res) => {
  res.send('Home Page');
});

// Create new todo - POST /todos
app.post('/todos', (req, res, next) => {
  const { body = {} } = req;
  readTodos().then(todos => {
    const todoToAdd = body.todo;
    todoToAdd.id = uuidv4();
    todoToAdd.status = false;
    todos.push(todoToAdd);
    writeFile(todos)
      .then(() => res.send(`Wrote ${body.todo.description}`)) // response return in postman
      .catch(err => next(err));
  });
});

// Read and List all todos - GET /todos
app.get('/todos', (req, res, next) => {
  readTodos()
    .then(data => {
      res.json(data);
      res.end();
    })
    .catch(err => next(err));
});

// update todo - PUT /todos/:id
app.put('/todos/:id', (req, res, next) => {
  const updateId = req.params.id;
  const newTodoData = req.body.todo.description;
  readTodos()
    .then(todos => {
      const todoToUpdate = todos.find(todo => todo.id === updateId);
      todoToUpdate.description = newTodoData;
      return writeFile(todos);
    })
    .then(() => res.send(`Updated ${updateId}`))
    .catch(err => next(err));
});

// delete todo - DELETE /todos/:id
app.delete('/todos/:id', (req, res, next) => {
  const removeId = req.params.id;
  readTodos().then(todos => {
    const newTodos = todos.filter(todo => todo.id !== removeId);
    writeFile(newTodos)
      .then(() => res.send(`Removed ${removeId}`))
      .catch(err => next(err));
  });
});

// delete all - DELETE /todos
app.delete('/todos/:id', (req, res, next) => {
  readTodos().then(todos => {
    const newTodos = [];
    writeFile(newTodos)
      .then(() => res.send(`Removed all`))
      .catch(err => next(err));
  });
});

// setting status to done - PUT /todos/:id/done
app.put('/todos/:id/done', (req, res, next) => {
  const doneId = req.params.id;
  readTodos()
    .then(todos => {
      const doneTodo = todos.find(todo => todo.id === doneId);
      doneId.status = true;
      return writeFile(todos);
    })
    .then(() => res.send(`Updated status to done for ${doneId}`))
    .catch(err => next(err));
});

// setting status to not done - PUT /todos/:id/not done
app.put('/todos/:id/notdone', (req, res, next) => {
  const doneId = req.params.id;
  readTodos()
    .then(todos => {
      const doneTodo = todos.find(todo.id === doneId);
      doneTodo.status = false;
      return writeFile(todos);
    })
    .then(() => res.send(`Updated status to not done${doneId}`))
    .catch(err => next(err));
});

// ERROR HANDLING in json
app.use((error, req, res, next) => {
  res.status(500).send({ error });
});

// env variable instead of a fixed port
const port = process.env.PORT || 3000; // this sets a variable in our process env
app.listen(port, () => console.log(`Listening on port ${port}....`));
