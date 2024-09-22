import TodoList from "./utils/todoList";
import CategoryList from "./utils/categoryList";

const todoList = new TodoList();

const defaultCategories = [
  {id: "1", name: "Work"},
  {id: "2", name: "Personal"}
]
const categoryList = new CategoryList(defaultCategories)

//takes new todo input value and selectedCategory and pushed it into todoList array using addTodo method, runs displayTodos and resetCategorySelection
const addNewTodo = () => {
  const newTodoInput = document.querySelector("#new-todo");

  let todoText = newTodoInput.value;
  let selectedCategory = categorySelection()

  todoList.addTodo(todoText, false, selectedCategory, Date.now);
  newTodoInput.value = "";
  displayTodos();
  resetCategorySelection()
};

const createCategoryOptions = () => {
  const categorySelector = document.querySelector("#category-select")
  const categoryFilter = document.querySelector("#category-filter")

  const categories = categoryList.getCategories()

  categories.forEach((category) => {
    const selectOption = document.createElement("option")
    selectOption.textContent = category.name
    selectOption.value = category.id

    const filterOption = document.createElement("option")
    filterOption.textContent = category.name
    filterOption.value = category.id

    categoryFilter.appendChild(filterOption)
    categorySelector.appendChild(selectOption)
  })

}

//takes category selector value and returns it
const categorySelection = () => {
  const categorySelector = document.querySelector("#category-select")

  let selectedCategory = categorySelector.value;
  return selectedCategory
}

//resets category selector after new todo form is submitted
const resetCategorySelection = () => {
  const categorySelector = document.querySelector("#category-select")
  categorySelector.value = ""
}

//listens for new todo form submission and runs addNewTodo
const submitForm = () => {
  const todoForm = document.querySelector("#todo-form");
  todoForm.addEventListener("submit", (e) => {
    e.preventDefault();
    addNewTodo();

    console.log(todoList.getList())
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

const createCategoryTag = (todo) => {
  const categoryTag = document.createElement("p")
  const category = categoryList.getCategoryById(todo.category)

  categoryTag.textContent = category ? category.name : "Unknown Category"
  categoryTag.classList.add("text-sm", "border", "border-green-500", "p-1", "text-green-700")

  return categoryTag
}

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
    todoItem.classList.add("flex", "justify-between", "my-1");
    itemDiv.classList.add("flex", "align-center");
    itemText.classList.add("p-1");

    todoItem.appendChild(itemDiv);
    todoItem.appendChild(buttonDiv);

    itemDiv.appendChild(createCheckbox(todo));
    itemDiv.appendChild(itemText);
    itemDiv.appendChild(createCategoryTag(todo))

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

createCategoryOptions()
submitForm();
displayTodos();
clearCompletedTodos();
