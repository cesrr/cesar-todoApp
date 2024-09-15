export default class TodoItem {
    constructor(name, complete, category, due) {
        this.name = name;
        this.complete = complete;
        this.id = Date.now();
        this.category = category;
        this.due = due;
    }
}

