import TodoItem from "./todoItem";

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

    addTodo(name, complete, category, id) {
        const newTodo = new TodoItem(name, complete, category, id)
        this.todos.push(newTodo)
    }

    deleteTodo(id) {
        this.todos = this.todos.filter(todo => todo.id !== id)
    }
}