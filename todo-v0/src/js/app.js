const $toggleAll = document.querySelector('.toggle-all');
const $todoInput = document.querySelector('.todo-input');
const $todoList = document.querySelector('.todo-list');

// todo: { id: number, content: string, checked: boolean}
let todos = [];

const render = () => {
  $todoList.innerHTML = todos
    .map(
      ({ id, content, checked }) => `
    <li data-id="${id}" class="todo-item">
      <input type="checkbox" ${checked ? 'checked' : ''} />
      <span>${content}</span>
    </li>
  `
    )
    .join('');
};

const setTodo = _todos => {
  todos = [..._todos];
  render();
};

const getNextId = () => Math.max(...todos.map(todo => todo.id), 0) + 1;

const addTodo = todo => {
  const _todos = [{ id: getNextId(), content: todo, checked: false }, ...todos];
  setTodo(_todos);
};

$todoInput.onkeyup = e => {
  const { code } = e;
  const todo = e.target.value.trim();
  if (code !== 'Enter' || todo === '') return;

  e.target.value = '';
  addTodo(todo);
};

document.addEventListener('DOMContentLoaded', render);
