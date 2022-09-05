import React, { useContext, useEffect, useState } from "react";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import CartContext from "../../store/cart-context";
import classes from "./HeaderCartButton.module.css";

const HeaderCartButton = (props) => {
  const [buttonHighlight, setButtonHighlight] = useState(false);
  const cartContext = useContext(CartContext);

  const cartItemCount = cartContext.items.reduce((currentAmount, item) => {
    return currentAmount + item.amount;
  }, 0);

  const { items } = cartContext;

  const buttonClasses = `${classes.button} ${
    buttonHighlight ? classes.bump : ""
  }`;

  useEffect(() => {
    if (cartContext.items.length === 0) {
      return;
    }
    setButtonHighlight(true);
    const timer = setTimeout(() => {
      setButtonHighlight(false);
    }, 300);
    return () => {
      clearTimeout(timer);
    };
  }, [items]);
  return (
    <button className={buttonClasses} onClick={props.onCartClick}>
      <span className={classes.icon}>
        {" "}
        <ShoppingCartIcon />{" "}
      </span>
      <span>Your Cart</span>
      <span className={classes.badge}> {cartItemCount} </span>
    </button>
  );
};

export default HeaderCartButton;
