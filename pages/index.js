import NavbarComponent from "@/components/Navbar";
import Todo from "@/components/todo";
import { Fragment, useEffect } from "react";
import { todoActions } from "@/components/Store";
import { useDispatch, useSelector } from "react-redux";
import { MongoClient } from "mongodb";

export default function Home(props) {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(todoActions.setTodo(props.todos));
  }, []);

  const todos = useSelector((state) => state.todo.todos);

  async function addTodo(todo) {
    dispatch(todoActions.addTodo(todo));
    const response = await fetch("/api/new-task", {
      method: "POST",
      body: JSON.stringify(todo),
      headers: {
        "Content-type": "application/json",
      },
    });
    const data = await response.json();
    console.log(data);
  }

  async function completedTodo(id) {
    const updatedTodos = [...todos];
    const completedTodoObject = updatedTodos.find((todo) => todo.id === id);
    // dispatch(todoActions.addCompletedTodo(completedTodoObject));
    const index = updatedTodos.indexOf(completedTodoObject);
    dispatch(todoActions.updateTodo(index));
    console.log(completedTodoObject.id);
    const response = await fetch(`/api/update-status`, {
      method: "PUT",
      body: JSON.stringify({
        id: completedTodoObject.id,
      }),
      headers: {
        "Content-type": "application/json",
      },
    });
  }

  async function deleteTodo(id) {
    const updatedTodos = [...todos];
    const completedTodoObject = updatedTodos.find((todo) => todo.id === id);
    const index = updatedTodos.indexOf(completedTodoObject);
    dispatch(todoActions.updateTodo(index));
    await fetch(`/api/${id}`, {
      method: "DELETE",
    });
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

export async function getStaticProps() {
  console.log("running get method");
  const client = await MongoClient.connect(
    "mongodb+srv://swati:swati4s@cluster0.or8j6ek.mongodb.net/todos"
  );
  const db = client.db();
  const todosColeection = db.collection("todos");
  const todos = await todosColeection.find().toArray();
  client.close();
  console.log(todos);
  const todosArray = todos.map((todo) => ({
    name: todo.name,
    id: todo.id,
    status: todo.status,
  }));
  const incompleteTodos = todosArray.filter(
    (todo) => todo.status === "incomplete"
  );

  return {
    props: {
      todos: incompleteTodos,
    },
    revalidate: 1,
  };
}
