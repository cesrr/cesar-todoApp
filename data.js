class TodoItem {
    constructor(name, complete, category, due) {
        this.name = name;
        this.complete = complete;
        this.id = Date.now();
        this.category = category;
        this.due = due;
    }
}

class TodoList {
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