import express from "express";
import TodoList from "./utils/todoList.js";
import CategoryList from "./utils/categoryList.js";

const app = express();
const port = 3000;

const todoList = new TodoList();
const categoryList = new CategoryList();

app.use(express.json());
app.use(express.static("public"));

//get all todos
app.get("/api/todos", (req, res) => {
  res.json(todoList.getList());
  console.log("retrieved list:", todoList.getList())
});

//create new todo
app.post("/api/todos", (req, res) => {
  const { name, complete, category } = req.body;
  const newTodo = todoList.addTodo(name, complete, category);
  console.log("created:", newTodo)
  if (newTodo) {
    res.status(201).json(newTodo);
  } else {
    res.status(500).json({ error: "Failed to create new todo" });
  }
});

//edit todo name, complete status
// app.put("/api/todos/:id", (req, res) => {
//   const todoId = req.params.id;
//   console.log(todoId)
//   const editedTodo = req.body;
//   console.log(editedTodo)
//   const updatedTodo = todoList.updateTodo(todoId, editedTodo);
//   if (updatedTodo) {
//     res.status(200).json(updatedTodo);
//   } else {
//     res.status(404).json({ message: "Todo not found" });
//   }
// });

app.put("/api/todos/:id", (req, res) => {
  const todoId = req.params.id;
  console.log(`Received request to update todo with ID: ${todoId}`);
  
  const editedTodo = req.body;
  console.log(`Request payload: ${JSON.stringify(editedTodo)}`);
  
  try {
    const updatedTodo = todoList.updateTodo(todoId, editedTodo);
    if (updatedTodo) {
      console.log(`Todo with ID: ${todoId} updated successfully`);
      res.status(200).json(updatedTodo);
    } else {
      console.log(`${updatedTodo} with ID: ${todoId} not found`);
      res.status(404).json({ message: "Todo not found" });
    }
  } catch (error) {
    console.error(`Error updating todo with ID: ${todoId}`, error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

//delete todo
app.delete("/api/todos/:id", (req, res) => {
  const todoId = req.params.id;
  const deletedTodo = todoList.deleteTodo(todoId);
  if (deletedTodo) {
    res.status(200).json(deletedTodo);
  } else {
    res.status(404).json({ message: "Todo not found" });
  }
});

//get all todos by category
app.get("/api/todos/category/:id", (req, res) => {
  const categoryId = req.params.id;
  const todosInCategory = todoList.getTodosByCategory(categoryId);
  res.status(200).json(todosInCategory);
});

//get categories
app.get("/api/categories", (req, res) => {
  res.json(categoryList.getCategories());
});

//get category name by ID
app.get("/api/categories/:id", (req, res) => {
  const categoryId = req.params.id;
  const categories = categoryList.getCategories();
  const categoryData = categories.find(cat => cat.id === categoryId);
  if (categoryData) {
    res.json(categoryData);
  } else {
    res.status(404).json({ error: "Category not found" });
  }
});

//create new category
app.post("/api/categories", (req, res) => {
    const { name } = req.body;
    if (!name) {
      return res.status(400).json({ error: 'ID and name are required' });
    }
  
    const newCategory = categoryList.addCategory(name);
  
    if (newCategory) {
      return res.status(201).json(newCategory);
    } else {
      return res.status(500).json({ error: 'Failed to create category' });
    }
});

//edit category name
app.put("/api/categories/:id", (req, res) => {
    const { id } = req.params;
    const { name } = req.body;
  
    if (!id || !name) {
      return res.status(400).json({ error: 'ID and name are required' });
    }
  
    const updatedCategory = categoryList.updateCategory(id, { name });
  
    if (updatedCategory) {
      return res.status(200).json(updatedCategory);
    } else {
      return res.status(404).json({ error: 'Category not found' });
    }
});

//delete category
app.delete("/api/categories/:id", (req, res) => {
  const categoryId = req.params.id;
  const deletedCategory = categoryList.deleteCategory(categoryId);
  if (deletedCategory) {
    res.status(200).json(deletedCategory);
  } else {
    res.status(404).json({ message: "Category not found" });
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
