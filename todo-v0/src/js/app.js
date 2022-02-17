const $toggleAll = document.querySelector('.toggle-all');
const $todoInput = document.querySelector('.todo-input');
const $todoList = document.querySelector('.todo-list');
const $count = document.querySelector('.count');

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
      <span class="content">${content}</span>
      <input class="content-edit hidden" type="text" />
      <button class="remove" type="button">x</button>
    </li>
  `
    )
    .join('');

  $count.textContent = `${todos.length} item${todos.length > 1 ? 's' : ''} left`;
};

const setTodo = _todos => {
  todos = [..._todos];
  console.log(todos);
  render();
};

const getNextId = () => Math.max(...todos.map(todo => todo.id), 0) + 1;

const addTodo = content => {
  const _todos = [{ id: getNextId(), content, checked: false }, ...todos];
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

const removeTodo = id => {
  const _todos = todos.filter(todo => todo.id !== +id);
  setTodo(_todos);
};

const editTodo = (id, content) => {
  const _todos = todos.map(todo => (todo.id === +id ? { ...todo, content } : todo));
  setTodo(_todos);
};

$toggleAll.onclick = ({ target: { checked } }) => {
  toggleAll(checked);
};

$todoList.onclick = ({ target }) => {
  if (!(target.matches('.toggle') || target.matches('.remove'))) return;
  const { id } = target.closest('.todo-item').dataset;
  target.matches('.toggle') ? toggle(id) : removeTodo(id);
};

$todoList.ondblclick = ({ target }) => {
  if (!target.matches('.content')) return;
  target.classList.add('hidden');

  const contentEdit = target.closest('.todo-item').querySelector('.content-edit');
  contentEdit.value = target.textContent;
  contentEdit.classList.remove('hidden');
};

$todoInput.onkeyup = e => {
  const { code } = e;
  const todo = e.target.value.trim();
  if (code !== 'Enter' || todo === '') return;

  e.target.value = '';
  addTodo(todo);
};

$todoList.onkeyup = e => {
  if (!e.target.matches('.content-edit')) return;
  const { code } = e;
  const todo = e.target.value.trim();

  if (code !== 'Enter' || todo === '') return;

  const { id } = e.target.closest('.todo-item').dataset;
  editTodo(id, todo);
};

document.addEventListener('DOMContentLoaded', render);
