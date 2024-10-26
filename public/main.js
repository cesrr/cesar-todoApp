// import TodoList from "./utils/todoList.js";
// import CategoryList from "./utils/categoryList.js";

// const todoList = new TodoList();
let isCategoryViewVisible = false;

const defaultCategories = [
  { id: "1", name: "Work" },
  { id: "2", name: "Personal" },
];
const initializeDefaultCategories = async () => {
  for (const category of defaultCategories) {
    try {
      const response = await fetch('/api/categories', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(category),
      });

      if (!response.ok) {
        throw new Error(`Failed to create category: ${category.name}`);
      }

      const createdCategory = await response.json();
      console.log(`Category created: ${createdCategory.name}`);
    } catch (error) {
      console.error('Error creating category:', error);
    }
  }
};

const fetchTodos = async () => {
  try {
    const response = await fetch("/api/todos");
    const todos = await response.json();
    displayTodos(todos);
  } catch (error) {
    console.error("Error fetching todos:", error);
  }
};

//takes new todo input value and selectedCategory and pushed it into todoList array using addTodo method, runs displayTodos and resetCategorySelection
const addNewTodo = async () => {
  const newTodoInput = document.querySelector("#new-todo");

  let todoText = newTodoInput.value;
  let selectedCategory = categorySelection();

  const newTodo = {
    text: todoText,
    complete: false,
    category: selectedCategory,
    id: Date.now(),
  };

  try {
    const response = await fetch("/api/todos", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newTodo),
    });
    if (!response.ok) {
      throw new Error(`Server error: ${response.statusText}`);
    }

    const responseBody = await response.text();
    try {
      const addedTodo = JSON.parse(responseBody);
      newTodoInput.value = "";
      await fetchTodos();
      displayTotalTodos(); // Update the total todos count
    } catch (jsonError) {
      console.error("Error parsing JSON:", jsonError);
      console.error("Response body:", responseBody);
    }
  } catch (error) {
    console.error("Error adding todo:", error);
  }
  // todoList.addTodo(todoText, false, selectedCategory, Date.now);
  // newTodoInput.value = "";
  // displayTodos();
  resetCategorySelection();
};

const createAddCategoryBtn = (input) => {
  const addCategoryBtn = document.createElement("button");

  addCategoryBtn.textContent = "Add";
  addCategoryBtn.classList.add(
    "bg-blue-500",
    "text-white",
    "p-1",
    "rounded-sm",
    "hover:bg-white",
    "hover:text-blue-500"
  );

  addCategoryBtn.addEventListener("click", async () => {
    const categoryName = input.value;

    try {
      const response = await fetch('/api/categories', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name: categoryName }),
      });

      if (!response.ok) {
        throw new Error('Failed to add category');
      }

      const newCategory = await response.json();
      categoryList.addCategory(newCategory); // Update the local category list
      input.value = "";
      createCategoryView();
      createCategoryOptions();
    } catch (error) {
      console.error('Error adding category:', error);
    }
  });

  return addCategoryBtn;
};

const createCategoryOptions = async () => {
  const categorySelector = document.querySelector("#category-select");
  const categoryFilter = document.querySelector("#category-filter");

  categorySelector.innerHTML = "";
  categoryFilter.innerHTML = "";

  const defaultSelectorOption = document.createElement("option");
  defaultSelectorOption.textContent = "--Select--";
  categorySelector.appendChild(defaultSelectorOption);

  const defaultFilterOption = document.createElement("option");
  defaultFilterOption.textContent = "All";
  defaultFilterOption.value = null;
  categoryFilter.appendChild(defaultFilterOption);

  try {
    const response = await fetch('/api/categories');
    if (!response.ok) {
      throw new Error('Failed to fetch categories');
    }

    const categories = await response.json();

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
  } catch (error) {
    console.error('Error fetching categories:', error);
  }
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

  categoriesView.appendChild(addCategoryInput);
  categoriesView.appendChild(createAddCategoryBtn(addCategoryInput));
  categoriesView.appendChild(createEditList());
};

const createEditList = async () => {
  const editList = document.createElement("ul");

  editList.innerHTML = "";

  try {
    const response = await fetch('/api/categories');
    if (!response.ok) {
      throw new Error('Failed to fetch categories');
    }

    const categories = await response.json();

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
  } catch (error) {
    console.error('Error fetching categories:', error);
  }

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
      categoriesViewBtn.textContent = "Edit Categories";
    } else {
      createCategoryView();
      categoriesViewBtn.textContent = "Done Editing";
    }
    isCategoryViewVisible = !isCategoryViewVisible;
  });
};

//listens for new todo form submission and runs addNewTodo
const submitForm = () => {
  const todoForm = document.querySelector("#todo-form");
  todoForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    await addNewTodo();
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

  saveButton.addEventListener("click", async () => {
    const newName = inputElement.value;

    try {
      if (item.due) {
        // Update todo name
        const response = await fetch(`/api/todos/${item.id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ name: newName }),
        });
        if (!response.ok) {
          throw new Error("Failed to update todo");
        }

        const updatedTodo = await response.json();
        item.name = updatedTodo.name; // Update the local item with the server response
      } else {
        // Update category name
        const response = await fetch(`/api/categories/${item.id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ name: newName }),
        });

        if (!response.ok) {
          throw new Error("Failed to update category");
        }

        const updatedCategory = await response.json();
        item.name = updatedCategory.name; // Update the local item with the server response
        createCategoryView();
        createCategoryOptions();
      }

      displayTodos();
    } catch (error) {
      console.error("Error updating item:", error);
    }
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

  checkbox.addEventListener("click", async () => {
    try {
      const response = await fetch(`/api/todos/${item.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ complete: checkbox.checked }),
      });

      if (!response.ok) {
        throw new Error("Failed to update todo");
      }

      const updatedTodo = await response.json();
      item.complete = updatedTodo.complete; // Update the local item with the server response
      displayTotalTodos();
    } catch (error) {
      console.error("Error updating todo:", error);
    }
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

  deleteButton.addEventListener("click", async () => {
    try {
      if (item.due) {
        // Delete todo
        const response = await fetch(`/api/todos/${item.id}`, {
          method: "DELETE",
        });

        if (!response.ok) {
          throw new Error("Failed to delete todo");
        }

        list.deleteTodo(item.id); // Update the local list
      } else {
        // Delete category
        const response = await fetch(`/api/categories/${item.id}`, {
          method: "DELETE",
        });

        if (!response.ok) {
          throw new Error("Failed to delete category");
        }

        categoryList.deleteCategory(item.id); // Update the local category list
        createCategoryView();
        createCategoryOptions();
      }

      displayTodos();
    } catch (error) {
      console.error("Error deleting item:", error);
    }
  });
  return deleteButton;
};

const createCategoryTag = async (item) => {
  const categoryTag = document.createElement("p");

  try {
    const response = await fetch(`/api/categories/${item.category}`);
    if (!response.ok) {
      throw new Error("Failed to fetch category");
    }

    const category = await response.json();
    categoryTag.textContent = category ? category.name : "Unknown Category";
  } catch (error) {
    console.error("Error fetching category:", error);
    categoryTag.textContent = "Unknown Category";
  }
  categoryTag.classList.add(
    "text-sm",
    "border",
    "border-green-500",
    "p-1",
    "text-green-700"
  );

  return categoryTag;
};

// const appendCategoryTag = async (item) => {
//   const categoryTag = await createCategoryTag(item);
//   return categoryTag;
// };

//displays todos, takes optional parameter that filters list based on category
const displayTodos = (todos, filterCategory = null) => {
  const todoView = document.querySelector("#todo-view");

  todoView.innerHTML = "";

  let list = todos;

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

const displayTotalTodos = async () => {
  try {
    const response = await fetch("/api/todos");
    if (!response.ok) {
      throw new Error("Failed to fetch todos");
    }
    const todos = await response.json();
    const todoCount = document.querySelector("#todo-count");
    const incompleteTodos = todos.filter((todo) => !todo.complete);
    todoCount.textContent = `${incompleteTodos.length} todos left`;
  } catch (error) {
    console.error("Error fetching todos:", error);
  }
};

const clearCompletedTodos = () => {
  const clearCompleteBtn = document.querySelector("#clear-completed");

  clearCompleteBtn.addEventListener("click", async () => {
    try {
      // Fetch the current list of todos from the server
      const response = await fetch('/api/todos');
      if (!response.ok) {
        throw new Error('Failed to fetch todos');
      }

      const list = await response.json();
      const incompleteTodos = list.filter((todo) => !todo.complete);

      // Update the server with the new list of incomplete todos
      for (const todo of list) {
        if (todo.complete) {
          await fetch(`/api/todos/${todo.id}`, {
            method: 'DELETE',
          });
        }
      }

      displayTodos();
      displayTotalTodos(); // Update the total todos count
    } catch (error) {
      console.error('Error clearing completed todos:', error);
    }

  });
};

document.addEventListener("DOMContentLoaded", async () => {
  const categoryFilter = document.getElementById("category-filter");

  categoryFilter.addEventListener("change", async () => {
    const filterOption = filterByCategory();
    const todos = await fetchTodos()
    displayTodos(todos, filterOption);
  });

  await fetchTodos();
  await createCategoryOptions();
  await initializeDefaultCategories()
  submitForm();
  clearCompletedTodos();
  showCategoryView();
});
