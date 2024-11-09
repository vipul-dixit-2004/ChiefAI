import React from "react";

function Card({ recipe, idx, setRecipeIdx, setShowRecipe }): any {
  return (
    <div className="rounded-3xl h-[200px] p-4 mb-3 bg-slate-600 min-w-full text-white">
      <h1 className="text-4xl text-wrap">{`${idx + 1}. ${recipe.name}`}</h1>
      <p className="ml-5 text-xl py-2 px-3">---- {recipe.description}</p>
      <button
        className="px-4 py-2  text-green-400 rounded hover:bg-green-600"
        onClick={() => {
          setRecipeIdx(idx);
          setShowRecipe(true);
        }}
      >
        Read More...
      </button>
    </div>
  );
}

export default Card;
