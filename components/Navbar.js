import Link from "next/link";
import classes from "./Navbar.module.css";
import { useDispatch, useSelector } from "react-redux";
import { todoActions } from "./Store";

const NavbarComponent = () => {
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.todo.loading);
  const changeLoading = () => {
    dispatch(todoActions.setLoading(true));
  };

  return (
    <>
      <nav className={classes.navbar}>
        <Link onClick={changeLoading} className={classes.link} href="/">
          TODOS
        </Link>
        <Link
          onClick={changeLoading}
          className={classes.link}
          href="/completed-todo"
        >
          COMPLETED TODOS
        </Link>
      </nav>
      <nav>{loading && <h1>Loading...</h1>}</nav>
    </>
  );
};

export default NavbarComponent;
