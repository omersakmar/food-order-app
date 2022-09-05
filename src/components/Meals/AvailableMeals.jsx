import React, { useEffect, useState } from "react";
import Card from "../UI/Card";
import classes from "./AvailableMeals.module.css";
import MealItem from "./MealItem/MealItem";

const AvailableMeals = () => {
  const [availableMeals, setAvailableMeals] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const getRandomRecipes = async () => {
    const response = await fetch(
      `https://api.spoonacular.com/recipes/random?apiKey=${process.env.REACT_APP_API_KEY}&number=5`
    );
    const data = await response.json();

    setAvailableMeals(data.recipes);
    setIsLoading(false);

    console.log(data.recipes);
  };

  useEffect(() => {
    getRandomRecipes();
  }, []);

  if (isLoading) {
    return (
      <section className={classes.loadingText}>
        <p>Loading...</p>
      </section>
    );
  }

  const mealsList = availableMeals.map((recipe) => (
    <MealItem
      id={recipe.id}
      key={recipe.id}
      title={recipe.title}
      price={recipe.pricePerServing}
    />
  ));
  return (
    <section className={classes.meals}>
      <Card>
        <ul>{mealsList} </ul>
      </Card>
    </section>
  );
};

export default AvailableMeals;
