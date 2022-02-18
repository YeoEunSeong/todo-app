const $toggleAll = document.querySelector('.toggle-all');
const $todoInput = document.querySelector('.todo-input');
const $todoList = document.querySelector('.todo-list');
const $count = document.querySelector('.count');

// todo: { id: number, content: string, completed: boolean}
let todos = [];

const render = () => {
  $todoList.innerHTML = todos
    .map(
      ({ id, content, completed }) => `
    <li data-id="${id}" class="todo-item">
      <input class="toggle" type="checkbox" ${completed ? 'checked' : ''} />
      <span class="content">${content}</span>
      <input class="content-edit hidden" type="text" />
      <button class="remove" type="button">x</button>
    </li>
  `
    )
    .join('');

  $count.textContent = `${todos.length} item${
    todos.length > 1 ? 's' : ''
  } left`;
};

const fetchTodos = async () => {
  try {
    const { data: _todos } = await axios.get('/todos');
    setTodos(_todos);
  } catch (e) {
    console.error(e);
  }
};

const setTodos = _todos => {
  todos = [..._todos];
  console.log(todos);
  render();
};

const getNextId = () => Math.max(...todos.map(todo => todo.id), 0) + 1;

const addTodo = async content => {
  try {
    const { data: _todos } = await axios.post('/todos', {
      id: getNextId(),
      content,
      completed: false,
    });
    setTodos(_todos);
  } catch (e) {
    console.error(e);
  }
};

const toggleCompleted = async id => {
  const { completed } = todos.find(todo => todo.id === +id);
  try {
    const { data: _todos } = await axios.patch(`/todos/${id}`, {
      completed: !completed,
    });
    setTodos(_todos);
  } catch (e) {
    console.error(e);
  }
};

const toggleAll = async completed => {
  try {
    const { data: _todos } = await axios.patch('/todos', { completed });
    setTodos(_todos);
  } catch (e) {
    console.error(e);
  }
};

const removeTodo = async id => {
  try {
    const { data: _todos } = await axios.delete(`/todos/${id}`);
    setTodos(_todos);
  } catch (e) {
    console.error(e);
  }
};

const editTodo = async (id, content) => {
  try {
    const { data: _todos } = await axios.patch(`/todos/${id}`, { content });
    setTodos(_todos);
  } catch (e) {
    console.error(e);
  }
};

$toggleAll.onclick = ({ target }) => {
  toggleAll(target.checked);
};

$todoList.onclick = ({ target }) => {
  if (!(target.matches('.toggle') || target.matches('.remove'))) return;
  const { id } = target.closest('.todo-item').dataset;
  target.matches('.toggle') ? toggleCompleted(id) : removeTodo(id);
};

$todoList.ondblclick = ({ target }) => {
  if (!target.matches('.content')) return;
  target.classList.add('hidden');

  const contentEdit = target
    .closest('.todo-item')
    .querySelector('.content-edit');
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

document.addEventListener('DOMContentLoaded', fetchTodos);
