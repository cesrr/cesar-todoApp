import TodoList from "./utils/todoList";

const todoList = new TodoList();

const addNewTodo = () => {
  const newTodoInput = document.querySelector("#new-todo");

  let todoText = newTodoInput.value;
  todoList.addTodo(todoText, false, Date.now);
  newTodoInput.value = "";
  displayTodos();
};

const submitForm = () => {
  const todoForm = document.querySelector("#todo-form");
  todoForm.addEventListener("submit", (e) => {
    e.preventDefault();
    addNewTodo();
  });
};

const createSaveButton = (todo, inputElement) => {
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
    const newName = inputElement.value;
    todo.setName(newName);
    displayTodos();
  });

  return saveButton;
};

const createEditButton = (todo, todoItem) => {
  const editButton = document.createElement("button");
  editButton.textContent = "Edit";
  editButton.classList.add(
    "bg-green-500",
    "text-white",
    "p-1",
    "rounded-sm",
    "hover:bg-white",
    "hover:text-green-500"
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
    todoItem.appendChild(createSaveButton(todo, input));
  });

  return editButton;
};

const createCheckbox = (todo) => {
  const checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  checkbox.checked = todo.complete;

  checkbox.addEventListener("click", () => {
    todo.setComplete(checkbox.checked);
    displayTotalTodos();
    console.log(checkbox.checked);
  });
  return checkbox;
};

const createDeleteButton = (list, todo) => {
  const deleteButton = document.createElement("button");
  deleteButton.textContent = "X";
  deleteButton.classList.add(
    "bg-red-500",
    "text-white",
    "p-1",
    "rounded-sm",
    "hover:bg-white",
    "hover:text-red-500"
  );

  deleteButton.addEventListener("click", () => {
    list.deleteTodo(todo.getId());
    displayTodos();
  });
  return deleteButton;
};

const displayTodos = () => {
  const todoView = document.querySelector("#todo-view");

  todoView.innerHTML = "";
  const list = todoList.getList();

  list.forEach((todo) => {
    const todoItem = document.createElement("li");
    const itemText = document.createElement("p");
    const itemDiv = document.createElement("div");
    const buttonDiv = document.createElement("div");

    itemText.textContent = todo.name;
    todoItem.classList.add("flex", "justify-between");
    itemDiv.classList.add("flex", "align-center");
    itemText.classList.add("p-1");

    todoItem.appendChild(itemDiv);
    todoItem.appendChild(buttonDiv);
    itemDiv.appendChild(createCheckbox(todo));
    itemDiv.appendChild(itemText);
    buttonDiv.appendChild(createEditButton(todo, todoItem));
    buttonDiv.appendChild(createDeleteButton(todoList, todo));
    todoView.appendChild(todoItem);
  });

  displayTotalTodos();
};

const displayTotalTodos = () => {
  const todoCount = document.querySelector("#todo-count");
  const list = todoList.getList();
  const incompleteTodos = list.filter((todo) => !todo.complete);
  todoCount.textContent = `${incompleteTodos.length} todos left`;
};

const clearCompletedTodos = () => {
  const clearCompleteBtn = document.querySelector("#clear-completed");

  clearCompleteBtn.addEventListener("click", () => {
    const list = todoList.getList();
    const incompleteTodos = list.filter((todo) => !todo.complete);
    todoList.setList(incompleteTodos);
    displayTodos();
  });
};

submitForm();
displayTodos();
clearCompletedTodos();
