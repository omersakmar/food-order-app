import React, { useRef, useState } from "react";
import classes from "./Checkout.module.css";

const isBlank = (value) => value.trim() === "";

const Checkout = (props) => {
  const [inputsAreValid, setInputsAreValid] = useState({
    name: true,
    street: true,
    city: true,
  });
  const userInputName = useRef();
  const userInputStreet = useRef();
  const userInputCity = useRef();
  const handleOrderConfirmation = (e) => {
    e.preventDefault();

    const inputName = userInputName.current.value;
    const inputStreet = userInputStreet.current.value;
    const inputCity = userInputCity.current.value;

    const validName = !isBlank(inputName);
    const validStreet = !isBlank(inputStreet);
    const validCity = !isBlank(inputCity);

    setInputsAreValid({
      name: validName,
      street: validStreet,
      city: validCity,
    });
    const validForm = validName && validStreet && validCity;
    if (!validForm) {
      return;
    }
    props.onConfirm({
      name: inputName,
      street: inputStreet,
      city: inputCity,
    });
  };
  const invalidNameStyle = `${classes.control} ${
    inputsAreValid.name ? "" : classes.invalid
  }`;
  const invalidStreetStyle = `${classes.control} ${
    inputsAreValid.street ? "" : classes.invalid
  }`;
  const invalidCityStyle = `${classes.control} ${
    inputsAreValid.city ? "" : classes.invalid
  }`;
  return (
    <form className={classes.form} onSubmit={handleOrderConfirmation}>
      <div className={invalidNameStyle}>
        <label htmlFor="name">Your name</label>
        <input type="text" id="name" ref={userInputName} />
        {!inputsAreValid.name && <p>Required field.</p>}
      </div>
      <div className={invalidStreetStyle}>
        <label htmlFor="street">Street</label>
        <input type="text" id="street" ref={userInputStreet} />
        {!inputsAreValid.street && <p>Required field.</p>}
      </div>
      <div className={invalidCityStyle}>
        <label htmlFor="city">City</label>
        <input type="text" id="city" ref={userInputCity} />
        {!inputsAreValid.city && <p>Required field.</p>}
      </div>
      <div className={classes.actions}>
        <button type="button" onClick={props.onCancel}>
          Cancel
        </button>
        <button className={classes.submit}>Confirm</button>
      </div>
    </form>
  );
};

export default Checkout;
