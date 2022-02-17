const $toggleAll = document.querySelector('.toggle-all');
const $todoInput = document.querySelector('.todo-input');
const $todoList = document.querySelector('.todo-list');

// todo: { id: number, content: string, checked: boolean}
let todos = [
  { id: 0, content: 'HTML', checked: false },
  { id: 1, content: 'CSS', checked: true },
  { id: 2, content: 'JS', checked: false },
];

const render = () => {
  $todoList.innerHTML = todos
    .map(
      ({ id, content, checked }) => `
    <li data-id="${id}" class="todo-item">
      <input class="toggle" type="checkbox" ${checked ? 'checked' : ''} />
      <span>${content}</span>
    </li>
  `
    )
    .join('');
};

const setTodo = _todos => {
  todos = [..._todos];
  console.log(todos);
  render();
};

const getNextId = () => Math.max(...todos.map(todo => todo.id), 0) + 1;

const addTodo = todo => {
  const _todos = [{ id: getNextId(), content: todo, checked: false }, ...todos];
  setTodo(_todos);
};

const toggle = id => {
  const _todos = todos.map(todo => (todo.id === +id ? { ...todo, checked: !todo.checked } : todo));
  setTodo(_todos);
};

const toggleAll = checked => {
  const _todos = todos.map(todo => ({ ...todo, checked }));
  setTodo(_todos);
};

$toggleAll.onclick = ({ target: { checked } }) => {
  toggleAll(checked);
};

$todoList.onclick = ({ target }) => {
  if (!target.matches('.toggle')) return;
  const { id } = target.closest('.todo-item').dataset;
  toggle(id);
};

$todoInput.onkeyup = e => {
  const { code } = e;
  const todo = e.target.value.trim();
  if (code !== 'Enter' || todo === '') return;

  e.target.value = '';
  addTodo(todo);
};

document.addEventListener('DOMContentLoaded', render);
