import React from "react";

function Card({ recipe, idx, setRecipeIdx, setShowRecipe }) {
  return (
    <div
      onClick={() => {
        setRecipeIdx(idx);
        setShowRecipe(true);
      }}
      className="cursor-pointer bg-white rounded-xl shadow-md p-5 hover:shadow-lg transition-shadow duration-300 border border-green-200"
    >
      <h1 className="text-xl font-bold text-green-700 mb-2">
        {idx + 1}. {recipe.name}
      </h1>
      <p className="text-gray-600 text-sm mb-4">{recipe.description}</p>

      <button
        onClick={(e) => {
          e.stopPropagation(); // Prevent triggering card click
          setRecipeIdx(idx);
          setShowRecipe(true);
        }}
        className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
      >
        Read More →
      </button>
    </div>
  );
}

export default Card;
