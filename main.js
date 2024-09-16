import TodoItem from "./utils/todoItem";
import TodoList from "./utils/todoList";

const todoList = new TodoList();
const newTodoInput = document.querySelector("#new-todo");
const todoForm = document.querySelector("#todo-form")
const todoView = document.querySelector("#todo-view")

const addNewTodo = () => {
  let todoText = newTodoInput.value;
  todoList.addTodo(todoText, false, Date.now);
  newTodoInput.value = "";
  displayTodos()

};

todoForm.addEventListener("submit", (e) => {
  e.preventDefault();
  addNewTodo()
})

const displayTodos = () => {
  todoView.innerHTML = ""
  for(let i = 0; i < todoList.todos.length; i++){
    const todo = todoList.todos[i];
    const todoItem = document.createElement("li")
    todoItem.textContent = todo.name;
    todoView.appendChild(todoItem)
  }
}

displayTodos()
