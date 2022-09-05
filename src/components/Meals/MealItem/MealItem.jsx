import React, { useContext } from "react";
import CartContext from "../../../store/cart-context";
import classes from "./MealItem.module.css";
import MealItemForm from "./MealItemForm";
const MealItem = (props) => {
  const cartContext = useContext(CartContext);
  const price = "$" + props.price.toFixed(2);
  const handleOnAddToCart = (amount) => {
    cartContext.addItem({
      id: props.id,
      name: props.title,
      amount: amount,
      price: props.price,
    });
  };
  return (
    <li className={classes.meal}>
      <div>
        <h4> {props.title} </h4>

        <div className={classes.price}> {price} </div>
      </div>
      <div>
        <MealItemForm onAddToCart={handleOnAddToCart} />
      </div>
    </li>
  );
};

export default MealItem;
