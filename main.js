import TodoObject from "./utils/todoItem";
import TodoList from "./utils/todoList";

const todoList = new TodoList();
const todoObject = new TodoObject();

const newTodoInput = document.querySelector("#new-todo");
const todoForm = document.querySelector("#todo-form");
const todoView = document.querySelector("#todo-view");

const addNewTodo = () => {
  let todoText = newTodoInput.value;
  todoList.addTodo(todoText, false, Date.now);
  newTodoInput.value = "";
  displayTodos();
  console.log(todoList)
};

todoForm.addEventListener("submit", (e) => {
  e.preventDefault();
  addNewTodo();
});

const createSaveButton = (todo) => {
  const saveButton = document.createElement("button");
  saveButton.textContent = "Save";
  saveButton.classList.add(
    "bg-green-500",
    "text-white",
    "p-1",
    "rounded-sm",
    "hover:bg-blue-600"
  );

  saveButton.addEventListener("click", () => {
    todo.name = input.value;
    displayTodos();
  });

  return saveButton
};

const createEditButton = (todo, todoItem) => {
  const editButton = document.createElement("button");
  editButton.textContent = "Edit";
  editButton.classList.add(
    "bg-green-500",
    "text-white",
    "p-1",
    "rounded-sm",
    "hover:bg-blue-600"
  );

  editButton.addEventListener("click", () => {
    const input = document.createElement("input");
    input.type = "text";
    input.value = todo.name;
    input.classList.add(
      "flex-grow",
      "p-2",
      "border",
      "border-gray-300",
      "focus:outline-none",
      "focus:ring-2",
      "focus:ring-blue-500"
    );

    todoItem.innerHTML = "";
    todoItem.appendChild(input);
    todoItem.appendChild(createSaveButton());
  });
  return editButton;
};

const displayTodos = () => {
  const list = todoList.getList()
  todoView.innerHTML = "";
  for (let i = 0; i < list.length; i++) {
    const todo = list[i];

    const todoItem = document.createElement("li");

    todoItem.textContent = todo.name;
    todoItem.classList.add("flex", "justify-between");

    todoItem.appendChild(createEditButton());
    todoView.appendChild(todoItem);
  }
};

displayTodos();
