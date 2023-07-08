import NavbarComponent from "@/components/Navbar";
import { todoActions } from "@/components/Store";
import { MongoClient } from "mongodb";
import { Fragment, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const CompleteTodo = (props) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(todoActions.setCompletedTodo(props.completedTodos));
  }, []);

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

export async function getStaticProps() {
  const client = await MongoClient.connect(
    "mongodb+srv://swati:swati4s@cluster0.or8j6ek.mongodb.net/todos"
  );
  const db = client.db();
  const todoCollection = db.collection("todos");
  const result = await todoCollection.find().toArray();
  const todoArray = result.map((todo) => ({
    id: todo.id,
    name: todo.name,
    status: todo.status,
  }));
  const completedTodo = todoArray.filter((todo) => todo.status === "complete");
  return {
    props: {
      completedTodos: completedTodo,
    },
    revalidate: 1,
  };
}

export default CompleteTodo;
