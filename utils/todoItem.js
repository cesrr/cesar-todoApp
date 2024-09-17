export default class TodoObject {
    constructor(name, complete, category, due) {
        this.name = name;
        this.complete = complete;
        this.id = Date.now();
        this.category = category;
        this.due = due;
    }

    getName() {
        return this.name
    }

    setName(name) {
        this.name = name
    }

    getComplete() {
        return this.complete
    }

    setComplete(complete) {
        this.complete = complete
    }

    getId() {
        return this.id
    }

    setId(id) {
        this.id = id
    }

    getCategory() {
        return this.category
    }

    setCategory(category) {
        this.category = category
    }

    getDue() {
        return this.due
    }

    setDue(due) {
        this.due = due
    }
}

