import React from "react";
import api from "../utils/api";
import { getUser } from "../utils/getUser";

function Recipe({ r, setShowRecipe }) {
  const handleSaveRecipe = async () => {
    const user = getUser();
    console.log(user);
    try {
      const result = await api.post("/recipe/save", {
        _id: user._id,
        recipe: r
      })
      alert(result.data.message);

    } catch (e) {
      console.log(e)
    }
  };

  return (
    <div className="px-4 pb-6 max-w-3xl w-full mx-auto">
      {/* Action buttons */}
      <div className="flex justify-between items-center mb-4">
        <button
          className="px-4 py-2 bg-green-600 text-white rounded-lg shadow hover:bg-green-700 transition"
          onClick={() => setShowRecipe(false)}
        >
          ← Back
        </button>
        <button
          onClick={handleSaveRecipe}
          className="px-4 py-2 bg-yellow-500 text-white rounded-lg shadow hover:bg-yellow-600 transition"
        >
          ⭐ Save Recipe
        </button>
      </div>

      {/* Recipe Card */}
      <div className="bg-white rounded-xl shadow-md p-6 space-y-4">
        <h1 className="text-3xl font-bold text-green-700">{r.name}</h1>
        <p className="text-gray-700 text-lg">{r.description}</p>

        {/* Ingredients */}
        <div>
          <h3 className="text-xl font-semibold text-green-600 mb-2">
            Ingredients
          </h3>
          <ul className="list-decimal list-inside space-y-1 text-gray-800">
            {r.ingredients.map((ele, idx) => (
              <li key={idx}>{ele}</li>
            ))}
          </ul>
        </div>

        {/* Instructions */}
        <div>
          <h3 className="text-xl font-semibold text-green-600 mb-2">
            Instructions
          </h3>
          <ol className="list-decimal list-inside space-y-2 text-gray-800">
            {r.instructions.map((ele, idx) => (
              <li key={idx}>{ele}</li>
            ))}
          </ol>
        </div>

        {/* Tip */}
        {r.tip && (
          <p className="text-green-700 italic font-medium border-l-4 border-green-500 pl-3">
            💡 Tip: {r.tip}
          </p>
        )}
      </div>
    </div>
  );
}

export default Recipe;
