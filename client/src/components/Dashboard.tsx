import React, { useState } from "react";
import Panel from "./Panel";
import Recipes from "./Recipes";

function Dashboard() {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(false);
  console.log(recipes);

  return (
    <>
      <div className="flex h-screen flex-col md:flex-row">
        <div className="w-full h-auto md:h-screen md:w-1/5 bg-green-600">
          <Panel
            setRecipes={setRecipes}
            recipes={recipes}
            setLoading={setLoading}
          />
        </div>
        <div className="flex md:w-4/5  w-full pt-4 px-1 justify-center items-center">
          <Recipes r={recipes} loading={loading} />
        </div>
      </div>
    </>
  );
}

export default Dashboard;
