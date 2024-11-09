import React, { useState } from "react";
import Panel from "./Panel";
import Recipes from "./Recipes";
import Recipe from "./Recipe";

function Dashboard() {
  const [showRecipe, setShowRecipe] = useState(false);
  const [recipeIdx, setRecipeIdx] = useState(0);
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showNavbar, setShowNavbar] = useState(false);

  return (
    <>
      <div className="flex h-screen flex-col md:flex-row">
        <div className="w-full h-auto md:h-screen md:w-1/5 bg-green-600">
          <Panel
            setRecipes={setRecipes}
            setLoading={setLoading}
            showNavbar={showNavbar}
            setShowNavbar={setShowNavbar}
          />
        </div>
        <div className="flex md:w-4/5 w-full pt-4 flex-col px-1 items-center">
          {!showRecipe ? (
            <Recipes
              r={recipes}
              loading={loading}
              setRecipeIdx={setRecipeIdx}
              setShowRecipe={setShowRecipe}
            />
          ) : (
            <Recipe r={recipes[recipeIdx]} setShowRecipe={setShowRecipe} />
          )}
        </div>
      </div>
    </>
  );
}

export default Dashboard;
