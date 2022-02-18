const fs = require('fs');
const express = require('express');

const app = express();
const port = 9000;

let todos = JSON.parse(fs.readFileSync(`${__dirname}/data/todos.json`));

const setTodos = _todos => {
  todos = [..._todos];
  fs.writeFileSync(`${__dirname}/data/todos.json`, JSON.stringify(todos));
};

app.use(express.static('public'));
app.use(express.json());

app.get('/todos', (req, res) => {
  res.send(todos);
});

app.post('/todos', (req, res) => {
  console.log(req.body);
  setTodos([req.body, ...todos]);
  res.send(todos);
});

app.patch('/todos', (req, res) => {
  const { completed } = req.body;
  setTodos(todos.map(todo => ({ ...todo, completed })));
  res.send(todos);
});

app.patch('/todos/:id', (req, res) => {
  const { id } = req.params;
  const payload = req.body;

  setTodos(
    todos.map(todo => (todo.id === +id ? { ...todo, ...payload } : todo))
  );
  res.send(todos);
});

app.delete('/todos/:id', (req, res) => {
  const { id } = req.params;

  setTodos(todos.filter(todo => todo.id !== +id));
  res.send(todos);
});

app.delete('/todos', (req, res) => {
  const { completed } = req.query;

  setTodos(todos.filter(todo => todo.completed !== JSON.parse(completed)));
  res.send(todos);
});

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
