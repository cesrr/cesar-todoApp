import TodoObject from './todoItem.js'

export default class TodoList {
    constructor() {
        this.todos = [];
    }

    getList() {
        return this.todos
    }

    setList(newList) {
        this.todos = newList
    }

    clearList() {
        this.todos = []
    }

    addTodo(name, complete, category) {
        const newTodo = new TodoObject(name, complete, category)
        this.todos.push(newTodo)
    }

    deleteTodo(id) {
        this.todos = this.todos.filter(todo => todo.id !== id)
    }

    updateTodo(id, updatedData) {
        const todo = this.todos.find(todo => todo.id === id)
        if(todo) {
            if(updatedData.name !== undefined) {
                todo.setName(updatedData.name)
            }
            if(updatedData.complete !== undefined) {
                todo.setComplete(updatedData.complete)
            }
            return todo
        }
        return null;
    }

    getTodosByCategory(categoryID) {
        return this.todos.filter(todo => todo.category === categoryID)
    }
}