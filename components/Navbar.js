import Link from "next/link";
import classes from "./Navbar.module.css";

const NavbarComponent = () => {
  return (
    <nav className={classes.navbar}>
      <Link className={classes.link} href="/">
        TODOS
      </Link>
      <Link className={classes.link} href="/completed-todo">
        COMPLETED TODOS
      </Link>
    </nav>
  );
};

export default NavbarComponent;
