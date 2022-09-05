import { Fragment } from "react";

import Meals from "../Meals/Meals";
import classes from "./Header.module.css";

import HeaderCartButton from "./HeaderCartButton";

const Header = (props) => {
  return (
    <Fragment>
      <header className={classes.header}>
        <h1>React Meals</h1>
        <HeaderCartButton onCartClick={props.onCartDisplayChange} />
      </header>
    </Fragment>
  );
};

export default Header;
