export default class TodoList {
    constructor() {
        this.todos = [];
    }

    addTodo(name, category, due) {
        const newTodo = new TodoItem(name, false, category, due)
        this.todos.push(newTodo)
    }

    deleteTodo(id) {
        this.todos = this.todos.filter(todo => todo.id !== id)
    }
}