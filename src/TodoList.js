import React from "react";
import { observer } from "mobx-react";
import "./App.css";

@observer
export default class TodoList extends React.Component {
  createNew(e) {
    if (e.which === 13) {
      this.props.store.createTodo(e.target.value);
      e.target.value = "";
    }
  }
  filter(e) {
    this.props.store.filter = e.target.value;
  }
  toggleComplete(todo) {
    todo.complete = !todo.complete;
  }
  render() {
    const { clearComplete, filter, filteredTodos } = this.props.store;
    const listItem = filteredTodos.map(todo => (
      <li key={todo.id}>
        <input
          type="checkbox"
          onChange={this.toggleComplete.bind(this, todo)}
          value={todo.complete}
          checked={todo.complete}
        />
        {todo.value}
      </li>
    ));
    return (
      <div className="App">
        <label>
          Add a todo:
          <input className="create" onKeyPress={this.createNew.bind(this)} />
        </label>
        <label>
          Search:
          <input
            className="filter"
            value={filter}
            onChange={this.filter.bind(this)}
          />
        </label>

        <ul>{listItem}</ul>
        <button onClick={clearComplete}>Clear</button>
      </div>
    );
  }
}
