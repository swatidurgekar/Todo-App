import { useRef, useState } from "react";
import classes from "./todo.module.css";
// import classes from './'

const Todo = (props) => {
  const [addTodo, setAddTodo] = useState(false);
  const [checked, setChecked] = useState(false);
  const taskName = useRef();

  const submitHandler = (event) => {
    event.preventDefault();
    setChecked(false);
    const enteredtaskName = taskName.current.value;
    props.addTodo({
      id: Math.random(),
      name: enteredtaskName,
      status: "incomplete",
    });
    setAddTodo(false);
  };

  const completedTodo = (id) => {
    setChecked(true);
    setTimeout(() => {
      props.completedTodo(id);
    }, 500);
  };

  const deleteTodo = (id) => {
    props.deleteTodo(id);
  };

  return (
    <div>
      {props.loading && (
        <div>
          <h1>Loading...</h1>
        </div>
      )}
      <h1>TODOS</h1>
      <ul>
        {props.todos.map((todo) => {
          return (
            <div key={todo.id}>
              <input
                checked={checked}
                type="checkbox"
                onClick={() => completedTodo(todo.id)}
              />
              <span>{todo.name}</span>
              <button onClick={() => deleteTodo(todo.id)}>DELETE</button>
            </div>
          );
        })}
      </ul>
      {!addTodo && <button onClick={() => setAddTodo(true)}>Add task</button>}
      {addTodo && (
        <form onSubmit={submitHandler} className={classes.form}>
          <label>Task name:</label>
          <input ref={taskName} type="text" />
          <button onClick={() => setAddTodo(false)}>cancel</button>
          <button type="submit">Add task</button>
        </form>
      )}
    </div>
  );
};

export default Todo;
