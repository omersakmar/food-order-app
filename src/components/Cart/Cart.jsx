import React, { Fragment, useContext, useState } from "react";
import Modal from "../UI/Modal";
import classes from "./Cart.module.css";
import CartContext from "../../store/cart-context";
import CartItem from "./CartItem";
import Checkout from "./Checkout";
const Cart = (props) => {
  const [isMakingOrder, setIsMakingOrder] = useState(false);
  const [isGivingOrder, setIsGivingOrder] = useState(false);
  const [madeAnOrder, setMadeAnOrder] = useState(false);
  const cartContext = useContext(CartContext);

  const totalAmount = `$${cartContext.totalAmount.toFixed(2)}`;
  const hasMeals = cartContext.items.length > 0;

  const handleRemoveItemFromCart = (id) => {
    cartContext.removeItem(id);
  };
  const handleAddItemToCart = (item) => {
    cartContext.addItem({ ...item, amount: 1 });
  };

  const cartItems = (
    <ul className={classes["cart-items"]}>
      {cartContext.items.map((item) => (
        <CartItem
          key={item.id}
          name={item.name}
          amount={item.amount}
          price={item.price}
          onRemove={handleRemoveItemFromCart.bind(null, item.id)}
          onAdd={handleAddItemToCart.bind(null, item)}
        />
      ))}
    </ul>
  );

  const handleMakeOrder = () => {
    setIsMakingOrder(true);
  };

  const handleOrderSubmit = async (userData) => {
    setIsGivingOrder(true);
    await fetch(
      "https://food-ordering-app-d3ceb-default-rtdb.europe-west1.firebasedatabase.app/orders.json",
      {
        method: "POST",
        body: JSON.stringify({
          user: userData,
          orderedMeals: cartContext.items,
        }),
      }
    );
    setIsGivingOrder(false);
    setMadeAnOrder(true);
    cartContext.clearItem();
  };

  const cartContent = (
    <Fragment>
      {cartItems}
      <div className={classes.total}>
        <span>Total amount</span>
        <span> {totalAmount} </span>
      </div>
      {isMakingOrder && (
        <Checkout onConfirm={handleOrderSubmit} onCancel={props.onCloseCart} />
      )}
      {!isMakingOrder && (
        <div className={classes.actions}>
          <button
            className={classes["button--alt"]}
            onClick={props.onCartInvisible}
          >
            Close
          </button>
          {hasMeals && (
            <button className={classes.order} onClick={handleMakeOrder}>
              Order
            </button>
          )}
        </div>
      )}
    </Fragment>
  );
  const makingAnOrder = <p>Processing your order...</p>;
  const receivedTheOrder = (
    <Fragment>
      <p>Your order has been received.</p>
      <div className={classes.actions}>
        <button className={classes.button} onClick={props.onCloseCart}>
          Close{" "}
        </button>
      </div>
    </Fragment>
  );

  return (
    <Modal onCloseCart={props.onCloseCart}>
      {!isGivingOrder && !madeAnOrder && cartContent}
      {isGivingOrder && makingAnOrder}
      {!isGivingOrder && madeAnOrder && receivedTheOrder}
    </Modal>
  );
};

export default Cart;
