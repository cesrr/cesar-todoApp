import TodoObject from "./todoItem.js";

export default class TodoList {
  constructor() {
    this.todos = [];
  }

  getList() {
    return this.todos;
  }

  setList(newList) {
    this.todos = newList;
  }

  clearList() {
    this.todos = [];
  }

  addTodo(name, complete, category) {
    const newTodo = new TodoObject(name, complete, category);
    this.todos.push(newTodo);
    return newTodo;
  }

  deleteTodo(id) {
    const todoId = Number(id);
    const todoIndex = this.todos.findIndex((todo) => todo.id === todoId);
    if (todoIndex !== -1) {
      const deletedTodo = this.todos[todoIndex];
      this.todos = this.todos.filter((todo) => todo.id !== todoId);
      return deletedTodo;
    }
    return null;
  }

  updateTodo(id, updatedData) {
    const todoId = Number(id);
    const todo = this.todos.find((todo) => todo.id === todoId);
    if (todo) {
      if (updatedData.name !== undefined) {
        todo.setName(updatedData.name);
      }
      if (updatedData.complete !== undefined) {
        todo.setComplete(updatedData.complete);
      }
      return todo;
    }
    return null;
  }

  getTodosByCategory(categoryID) {
    return this.todos.filter((todo) => todo.category === categoryID);
  }
}
