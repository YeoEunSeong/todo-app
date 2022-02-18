const express = require('express');

const app = express();
const port = 9000;

// Mock data
let todos = [
  { id: 3, content: 'Javascript', completed: false },
  { id: 2, content: 'CSS', completed: true },
  { id: 1, content: 'HTML', completed: false },
];

app.use(express.static('public'));
app.use(express.json());

app.get('/todos', (req, res) => {
  res.send(todos);
});

app.post('/todos', (req, res) => {
  console.log(req.body);
  todos = [req.body, ...todos];
  res.send(todos);
});

app.patch('/todos', (req, res) => {
  const { completed } = req.body;

  todos = todos.map(todo => ({ ...todo, completed }));
  res.send(todos);
});

app.patch('/todos/:id', (req, res) => {
  const { id } = req.params;
  const payload = req.body;

  todos = todos.map(todo => (todo.id === +id ? { ...todo, ...payload } : todo));
  res.send(todos);
});

app.delete('/todos/:id', (req, res) => {
  const { id } = req.params;

  todos = todos.filter(todo => todo.id !== +id);
  res.send(todos);
});

app.delete('/todos', (req, res) => {
  const { completed } = req.query;

  todos = todos.filter(todo => todo.completed !== JSON.parse(completed));
  res.send(todos);
});

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
