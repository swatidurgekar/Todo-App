import NavbarComponent from "@/components/Navbar";
import Todo from "@/components/todo";
import { Fragment, useState } from "react";
import { todoActions } from "@/components/Store";
import { useDispatch, useSelector } from "react-redux";

export default function Home(props) {
  const todos = useSelector((state) => state.todo.todos);
  const dispatch = useDispatch();

  function addTodo(todo) {
    dispatch(todoActions.addTodo(todo));
  }

  function completedTodo(id) {
    const updatedTodos = [...todos];
    const completedTodoObject = updatedTodos.find((todo) => todo.id === id);
    dispatch(todoActions.addCompletedTodo(completedTodoObject));
    const index = updatedTodos.indexOf(completedTodoObject);
    dispatch(todoActions.updateTodo(index));
  }

  function deleteTodo(id) {
    const updatedTodos = [...todos];
    const completedTodoObject = updatedTodos.find((todo) => todo.id === id);
    const index = updatedTodos.indexOf(completedTodoObject);
    dispatch(todoActions.updateTodo(index));
  }

  return (
    <Fragment>
      <NavbarComponent />
      <Todo
        todos={todos}
        addTodo={addTodo}
        completedTodo={completedTodo}
        deleteTodo={deleteTodo}
      />
    </Fragment>
  );
}
