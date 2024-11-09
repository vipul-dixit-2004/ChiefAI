import React from "react";

function Recipe({ r, setShowRecipe }) {
  return (
    <div>
      <button
        className="mb-4 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
        onClick={() => setShowRecipe(false)}
      >
        Back
      </button>
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold">{r.name}</h1>
        <h3 className="text-xl ml-3">{r.description}</h3>
        {/* ingredients */}
        <h3 className="text-xl font-bold">Ingredients</h3>
        <h4 className="text-xl ml-3">
          <ol>
            {r.ingredients.map((ele, idx) => (
              <li key={idx}>
                {idx + 1}. {ele}
              </li>
            ))}
          </ol>
        </h4>
        {/* instructions */}
        <h3 className="text-xl font-bold">Instructions</h3>
        <h4 className="text-xl ml-3">
          <ol>
            {r.instructions.map((ele, idx) => (
              <li key={idx}>
                {idx + 1}. {ele}
              </li>
            ))}
          </ol>
        </h4>
        <h3 className="text-xl text-green-600">Tip: {r.tip}</h3>
      </div>
    </div>
  );
}

export default Recipe;
