import NavbarComponent from "@/components/Navbar";
import Todo from "@/components/todo";
import { Fragment, useEffect } from "react";
import { todoActions } from "@/components/Store";
import { useDispatch, useSelector } from "react-redux";
import { MongoClient } from "mongodb";

export async function getStaticProps() {
  console.log("running get method");
  const client = await MongoClient.connect(
    "mongodb+srv://swati:swati4s@cluster0.or8j6ek.mongodb.net/todos"
  );
  const db = client.db();
  const todosColeection = db.collection("todos");
  const todos = await todosColeection.find().toArray();
  console.log(todos);
  const todosArray = todos.map((todo) => ({
    name: todo.name,
    id: todo.id,
    status: todo.status,
  }));
  client.close();
  return {
    props: {
      todos: todosArray,
    },
    revalidate: 1,
  };
}

export default function Home(props) {
  const dispatch = useDispatch();

  useEffect(() => {
    console.log(props.todos);
    const todos = [];
    props.todos.map((todo) => {
      if (todo.status === "incomplete") {
        todos.push(todo);
      }
    });
    dispatch(todoActions.setTodo(todos));
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
    dispatch(todoActions.addCompletedTodo(completedTodoObject));
    const index = updatedTodos.indexOf(completedTodoObject);
    dispatch(todoActions.updateTodo(index));
    console.log(completedTodoObject.name);
    const response = await fetch(`/api/update-status`, {
      method: "PUT",
      body: JSON.stringify({
        name: completedTodoObject.name,
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
