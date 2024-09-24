//TODO: get add category input to work

import TodoList from "./utils/todoList";
import CategoryList from "./utils/categoryList";

const todoList = new TodoList();
const defaultCategories = [
  { id: "1", name: "Work" },
  { id: "2", name: "Personal" },
];
const categoryList = new CategoryList(defaultCategories);
let isCategoryViewVisible = false;

//takes new todo input value and selectedCategory and pushed it into todoList array using addTodo method, runs displayTodos and resetCategorySelection
const addNewTodo = () => {
  const newTodoInput = document.querySelector("#new-todo");

  let todoText = newTodoInput.value;
  let selectedCategory = categorySelection();

  todoList.addTodo(todoText, false, selectedCategory, Date.now);
  newTodoInput.value = "";
  displayTodos();
  resetCategorySelection();
};

const createCategoryOptions = () => {
  const categorySelector = document.querySelector("#category-select");
  const categoryFilter = document.querySelector("#category-filter");

  categorySelector.innerHTML = "";
  categoryFilter.innerHTML = "";

  const defaultSelectorOption = document.createElement("option");
  defaultSelectorOption.textContent = "--Select--";
  categorySelector.appendChild(defaultSelectorOption);

  const defaultFilterOption = document.createElement("option");
  defaultFilterOption.textContent = "Any";
  categoryFilter.appendChild(defaultFilterOption);

  const categories = categoryList.getCategories();

  categories.forEach((category) => {
    const selectOption = document.createElement("option");
    selectOption.textContent = category.name;
    selectOption.value = category.id;

    const filterOption = document.createElement("option");
    filterOption.textContent = category.name;
    filterOption.value = category.id;

    categoryFilter.appendChild(filterOption);
    categorySelector.appendChild(selectOption);
  });
};

//takes category selector value and returns it
const categorySelection = () => {
  const categorySelector = document.querySelector("#category-select");

  let selectedCategory = categorySelector.value;
  return selectedCategory;
};

//resets category selector after new todo form is submitted
const resetCategorySelection = () => {
  const categorySelector = document.querySelector("#category-select");
  categorySelector.value = "";
};

const filterByCategory = () => {
  const filterOption = document.querySelector("#category-filter").value;
  return filterOption;
};

const createCategoryView = () => {
  const categoriesView = document.querySelector("#categories-view");
  const addCategoryInput = document.createElement("input");
  const addCategoryBtn = document.createElement("button");

  if (categoriesView) {
    categoriesView.classList.remove("hidden");
  }
  categoriesView.classList.add("border-b-4");

  categoriesView.innerHTML = "";

  addCategoryInput.type = "text";
  addCategoryInput.placeholder = "Add New Category";
  addCategoryInput.classList.add(
    "flex-auto",
    "p-2",
    "rounded-md",
    "focus:outline-none",
    "focus:ring-2",
    "focus:ring-blue-500"
  );

  addCategoryBtn.textContent = "Add";
  addCategoryBtn.classList.add(
    "bg-blue-500",
    "text-white",
    "p-1",
    "rounded-sm",
    "hover:bg-white",
    "hover:text-blue-500"
  );

  categoriesView.appendChild(addCategoryInput);
  categoriesView.appendChild(addCategoryBtn);
  categoriesView.appendChild(createEditList());
};



const createEditList = () => {
  const editList = document.createElement("ul");

  editList.innerHTML = "";

  let categories = categoryList.getCategories();

  categories.forEach((category) => {
    const catItem = document.createElement("li");
    const itemText = document.createElement("p");
    const itemDiv = document.createElement("div");
    const buttonDiv = document.createElement("div");

    itemText.textContent = category.name;
    catItem.classList.add("flex", "justify-between", "my-1");
    itemDiv.classList.add("flex", "align-center");
    itemText.classList.add("p-1");

    catItem.appendChild(itemDiv);
    catItem.appendChild(buttonDiv);

    itemDiv.appendChild(itemText);

    buttonDiv.appendChild(createEditButton(category, catItem));
    buttonDiv.appendChild(createDeleteButton(categoryList, category));

    editList.appendChild(catItem);
  });

  return editList;
};

const hideCategoryView = () => {
  const categoriesView = document.querySelector("#categories-view");
  if (categoriesView) {
    categoriesView.classList.add("hidden");
  }
};

const showCategoryView = () => {
  const categoriesViewBtn = document.querySelector("#categories-view-btn");

  categoriesViewBtn.addEventListener("click", () => {
    
    if (isCategoryViewVisible) {
      hideCategoryView();
      categoriesViewBtn.textContent = "Edit Categories"
    } else {
      createCategoryView();
      categoriesViewBtn.textContent = "Done Editing"

    }
    isCategoryViewVisible = !isCategoryViewVisible;

  });

};

//listens for new todo form submission and runs addNewTodo
const submitForm = () => {
  const todoForm = document.querySelector("#todo-form");
  todoForm.addEventListener("submit", (e) => {
    e.preventDefault();
    addNewTodo();

    console.log(todoList.getList());
  });
};

//creates various elements that attatch to todo list item
const createSaveButton = (item, inputElement) => {
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

    if (item === "todo") {
      item.setName(newName);
    } else {
      categoryList.editCategory(item.id, newName);
      createCategoryView();
      createCategoryOptions();
    }
    displayTodos();
    console.log(categoryList.getCategories());
  });

  return saveButton;
};

const createEditButton = (item, listItem) => {
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
    input.value = item.name;
    input.classList.add(
      "flex-grow",
      "p-2",
      "border",
      "border-gray-300",
      "focus:outline-none",
      "focus:ring-2",
      "focus:ring-blue-500"
    );

    listItem.innerHTML = "";
    listItem.appendChild(input);
    listItem.appendChild(createSaveButton(item, input));
  });

  return editButton;
};

const createCheckbox = (item) => {
  const checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  checkbox.checked = item.complete;

  checkbox.addEventListener("click", () => {
    item.setComplete(checkbox.checked);
    displayTotalTodos();
  });
  return checkbox;
};

const createDeleteButton = (list, item) => {
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
    if (item === "todo") {
      list.deleteTodo(item.getId());
    } else {
      categoryList.deleteCategory(item.id);
      createCategoryView();
      createCategoryOptions();
    }
    console.log(categoryList.getCategories());
    displayTodos();
  });
  return deleteButton;
};

const createCategoryTag = (item) => {
  const categoryTag = document.createElement("p");
  const category = categoryList.getId(item.category);

  categoryTag.textContent = category ? category.name : "Unknown Category";
  categoryTag.classList.add(
    "text-sm",
    "border",
    "border-green-500",
    "p-1",
    "text-green-700"
  );

  return categoryTag;
};

//displays todos, takes optional parameter that filters list based on category
const displayTodos = (filterCategory = null) => {
  const todoView = document.querySelector("#todo-view");

  todoView.innerHTML = "";

  let list = todoList.getList();

  if (filterCategory) {
    list = list.filter((todo) => todo.category === filterCategory);
  }

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
    itemDiv.appendChild(createCategoryTag(todo));

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

document.addEventListener("DOMContentLoaded", () => {
  const categoryFilter = document.getElementById("category-filter");

  categoryFilter.addEventListener("change", () => {
    const filterOption = filterByCategory();
    displayTodos(filterOption);
  });

  displayTodos();
  createCategoryOptions();
  submitForm();
  clearCompletedTodos();
  showCategoryView();
});
