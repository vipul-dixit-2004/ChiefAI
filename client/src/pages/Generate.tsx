import React, { useEffect, useState } from "react";
import Panel from "../components/Panel";
import Recipes from "../components/Recipes";
import Recipe from "../components/Recipe";
import { useNavigate } from "react-router-dom";
function Generate() {
  const navigate = useNavigate();

  const [showRecipe, setShowRecipe] = useState(false);
  const [recipeIdx, setRecipeIdx] = useState(0);
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showNavbar, setShowNavbar] = useState(false);

  return (
    <div className="flex flex-col md:flex-row h-screen bg-gradient-to-br from-green-50 via-white to-green-100">
      {/* Sidebar */}
      <div
        className={`${showNavbar ? "block" : "hidden"
          } md:block md:w-1/5 bg-green-600 text-white shadow-lg z-20`}
      >
        <div className="flex flex-col h-full">
          {/* App Header */}
          <div className="px-4 py-6 flex items-center justify-between border-b border-green-500">
            <h1 className="text-lg font-bold tracking-wide">ChefAI</h1>
            <button
              onClick={() => navigate('/dashboard')}
              className="bg-red-500 hover:bg-red-600 transition px-3 py-1 rounded text-sm"
            >
              Dashboard
            </button>
          </div>

          {/* Panel */}
          <div className="flex-1 overflow-y-auto p-4">
            <Panel
              setRecipes={setRecipes}
              setLoading={setLoading}
              showNavbar={showNavbar}
              setShowNavbar={setShowNavbar}
            />
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex flex-col w-full md:w-4/5 p-4">
        {/* Mobile Header */}
        <div className="flex items-center justify-between mb-4 md:hidden">
          <button
            onClick={() => setShowNavbar(!showNavbar)}
            className="bg-green-600 text-white px-3 py-2 rounded shadow"
          >
            ☰ Menu
          </button>
          <button
            onClick={() => navigate("/dashboard")}
            className="bg-red-500 text-white px-3 py-2 rounded shadow"
          >
            Dashboard
          </button>
        </div>

        {/* Recipes Section */}
        <div className="flex-1 overflow-y-auto bg-white rounded-lg shadow-md p-4">
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
    </div>
  );
}

export default Generate;
