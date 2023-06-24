import NavbarComponent from "@/components/Navbar";
import { Fragment } from "react";
import { useSelector } from "react-redux";

const CompleteTodo = () => {
  const completedTodos = useSelector((state) => state.todo.completedTodo);
  return (
    <Fragment>
      <NavbarComponent />
      <h1>COMPLETED TODOS</h1>
      {completedTodos.map((completedTodo) => {
        return <li key={completedTodo.id}>{completedTodo.name}</li>;
      })}
    </Fragment>
  );
};

export default CompleteTodo;
