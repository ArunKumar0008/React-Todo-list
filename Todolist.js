import { useState, useRef } from "react";
import "./Todolist.css";

const Todolist = () => {
  const [todolist, setTodolist] = useState([]);
  const inputRef = useRef();

  const addTodo = () => {
    const newTask = inputRef.current.value.trim();
    if (newTask) {
      setTodolist((prev) => [
        ...prev,
        { text: newTask, completed: false, id: Date.now() },
      ]);
      inputRef.current.value = "";
    }
  };

  const toggleCompleted = (id) => {
    setTodolist((prev) =>
      prev.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const deleteTodo = (id) => {
    setTodolist((prev) => prev.filter((todo) => todo.id !== id));
  };

  return (
    <div className="todolist-container">
      <div className="input-container">
        <input
          type="text"
          placeholder="Add a task..."
          ref={inputRef}
        />
        <button onClick={addTodo}>Add</button>
      </div>
      <ul>
        {todolist.map((todo) => (
          <TodoItem
            key={todo.id}
            todo={todo}
            onToggleCompleted={toggleCompleted}
            onDelete={deleteTodo}
          />
        ))}
      </ul>
    </div>
  );
};

const TodoItem = ({ todo, onToggleCompleted, onDelete }) => {
  const { text, completed, id } = todo;

  return (
    <li className="todo-item">
      <input
        type="checkbox"
        checked={completed}
        onChange={() => onToggleCompleted(id)}
      />
      <span className={completed ? "text completed" : "text"}>{text}</span>
      <button className="delete" onClick={() => onDelete(id)}>
        Delete
      </button>
    </li>
  );
};

export default Todolist;
