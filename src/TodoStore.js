import { computed, observable } from "mobx";
import Todo from "./Todo";

class TodoStore {
  @observable todos = [];
  @observable filter = "";
  @computed get filteredTodos() {
    const matchesFilter = new RegExp(this.filter, "i");
    return this.todos.filter(
      todo => !this.filter || matchesFilter.test(todo.value)
    );
  }
  createTodo(value) {
    this.todos.push(new Todo(value));
  }

  clearComplete = () => {
    const incompleteTodos = this.todos.filter(todo => !todo.complete);
    this.todos.replace(incompleteTodos);
  };
}

const store = (window.store = new TodoStore());

export default store;
