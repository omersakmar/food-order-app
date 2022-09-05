import React from "react";
import classes from "./MealsSummary.module.css";
import ArrowCircleDownIcon from "@mui/icons-material/ArrowCircleDown";
const MealsSummary = () => {
  return (
    <section className={classes.summary}>
      <h2>Food. However you like it.</h2>
      <ArrowCircleDownIcon />
    </section>
  );
};

export default MealsSummary;
