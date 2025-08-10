import Card from "./Card";

function Recipes({ r, loading, setRecipeIdx, setShowRecipe }) {
  return (
    <div className="flex-1 w-full">
      {loading ? (
        <div className="flex justify-center items-center h-full">
          <img src="loading.gif" alt="Loading..." className="max-w-80 h-80" />
        </div>
      ) : r && r.length > 0 ? (
        <div className="grid gap-4 overflow-y-auto max-h-[calc(100vh-100px)] p-2">
          {r.map((recipe, idx) => (
            <Card
              key={idx}
              recipe={recipe}
              setRecipeIdx={setRecipeIdx}
              setShowRecipe={setShowRecipe}
              idx={idx}
            />
          ))}
        </div>
      ) : (
        <div className="flex flex-col justify-center items-center h-full text-gray-500">
          <img
            src="/noRecipes.png"
            alt="No recipes available"
            className="max-w-96 mb-4 opacity-80"
          />

        </div>
      )}
    </div>
  );
}

export default Recipes;
