const $toggleAll = document.querySelector('.toggle-all');
const $todoList = document.querySelector('.todo-list');

// todo => { id: number, content: string, checked: boolean}
let todos = [];

const render = () => {
  $todoList.innerHTML = todos.map(
    ({ id, content, checked }) => `
    <li data-id="${id}" class="todo-item">
      <input type="checkbox" ${checked ? 'checked' : ''} />
      <span>${content}</span>
    </li>
  `
  );
};

window.onDomReady = () => {
  render();
};
