import express from 'express'
import TodoList from './utils/todoList'
import CategoryList from './utils/categoryList'

const app = express()
const port = 3000

const todoList = new TodoList();
const categoryList = new CategoryList();

app.use(express.json())

//get all todos
app.get('/api/todos', (req, res) => {
    res.json(todoList.getList())
});

//create new todo
app.post('/api/todos', (req, res) => {
    const newTodo = req.body
    const addedTodo = todoList.addTodo(newTodo)
    res.status(201).json(addedTodo)
});

//edit todo name, complete status
app.put('/api/todos/:id', (req, res) => {
    const todoId = req.params.id;
    const editedTodo = req.body
    const updatedTodo = todoList.updateTodo(todoId, editedTodo)
    if(updatedTodo) {
        res.status(200).json(updatedTodo)
    } else {
        res.status(404).json({ message: 'Todo not found'})
    }
});

//delete todo
app.delete('/api/todos/:id', (req, res) => {
    const todoId = req.params.id
    const deletedTodo = todoList.deleteTodo(todoId)
    if(deletedTodo) {
    res.status(200).json(deletedTodo)
    } else {
        res.status(404).json({ message: 'Todo not found'})
    }
})

//get all todos by category
app.get('/api/todos/category/:id', (req, res) => {
    const categoryId = req.params.id;
    const todosInCategory = todoList.getTodosByCategory(categoryId)
    res.status(200).json(todosInCategory);
})

//get categories
app.get('/api/categories', (req, res) => {
    res.json(categoryList.getCategories())
});

//create new category
app.post('/api/categories', (req, res) => {
    const newCategory = req.body
    const addedCategory = categoryList.addCategory(newCategory)
    res.status(201).json(addedCategory)
});

//edit category name
app.put('/api/categories/:id', (req, res) => {
    const categoryId = req.params.id;
    const editedCategory = req.body
    const updatedCategory = categoryList.editCategory(categoryId, editedCategory)
    if(updatedCategory) {
        res.status(200).json(updatedCategory)
    } else {
        res.status(404).json({ message: 'Category not found'})
    }
});

//delete category
app.delete('/api/categories/:id', (req, res) => {
    const categoryId = req.params.id
    const deletedCategory = categoryList.deleteCategory(categoryId)
    if(deletedCategory) {
    res.status(200).json(deletedCategory)
    } else {
        res.status(404).json({ message: 'Category not found'})
    }
})

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
  });