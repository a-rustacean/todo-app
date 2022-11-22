/** @type {HTMLDivElement} */
const todosDiv = document.getElementById("todos");
/** @type {HTMLButtonElement} */
const addTodoButton = document.getElementById("add-todo-button");
/** @type {HTMLInputElement} */
const todoInput = document.getElementById("todo-text");

/**
 * @returns {string[]}
 */
const fetchTodos = () => {
  let todos = localStorage.getItem("todos") || "[]";
  try {
    todos = JSON.parse(todos);
  } catch {
    todos = [];
  }
  return todos;
};

/**
 * @param {string} text
 */
const saveTodo = text => {
  const todos = fetchTodos();
  todos.push(text);
  localStorage.setItem("todos", JSON.stringify(todos));
}

const loadTodos = () => {
  const todos = fetchTodos();
  todos.forEach(todo => {
    addTodo(todo);
  })
}

/**
 * @param {number} index
 */
const removeTodo = index => todosDiv.removeChild(todosDiv.children[index]);

/**
 * @param {number} index
 */
const saveRemovedTodo = index => {
  const todos = fetchTodos();
  todos.splice(index, 1);
  localStorage.setItem("todos", JSON.stringify(todos));
}

/**
 * @param {string} text
 */
const addTodo = text => {
  /** @type {HTMLDivElement} */
  const todo = document.createElement("div");
  /** @type {HTMLParagraphElement} */
  const todoText = document.createElement("p");
  /** @type {HTMLButtonElement} */
  const removeTodoButton = document.createElement("button");
  
  todoText.textContent = text;
  removeTodoButton.textContent = "remove";
  todoText.className = "todo-text";
  removeTodoButton.className = "remove-todo";
  todo.className = "todo";
  todo.appendChild(todoText);
  todo.appendChild(removeTodoButton);
  todosDiv.appendChild(todo);
  removeTodoButton.addEventListener("click", () => {
    let index;
    for (let i = 0; i < todosDiv.children.length; i++) {
      const child = todosDiv.children[i];
      if (child.children[0].textContent === text) {
        index = i;
        break;
      }
    }
    removeTodo(index);
    saveRemovedTodo(index);
  })
}

addTodoButton.addEventListener("click", () => {
  const text = todoInput.value;
  addTodo(text);
  saveTodo(text);
  todoInput.value = "";
})

loadTodos();
