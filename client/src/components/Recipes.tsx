import Card from "./Card";

function Recipes({ r, loading, setRecipeIdx, setShowRecipe }): any {
  return (
    <>
      {loading ? (
        <div className="flex justify-center items-center h-full">
          <img src="loading.gif" alt="Loading..." />
        </div>
      ) : r && r.length > 0 ? (
        <div className="flex flex-col justify-start overflow-y-scroll max-h-[500px] p-4">
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
        <div className="flex justify-center items-center h-full">
          <img src="noRecipes.png" alt="No recipes available" />
        </div>
      )}
    </>
  );
}

export default Recipes;
