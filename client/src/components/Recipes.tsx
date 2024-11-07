import React from "react";
import Card from "./Card";

function Recipes({ r, loading }: any) {
  return (
    <>
      {loading ? (
        <div className="flex justify-center items-center h-full">
          <img src="/loading.gif" alt="No recipes available" />
        </div>
      ) : r && r.length > 0 ? (
        <div className="flex flex-col justify-start overflow-y-scroll max-h-[500px] p-4">
          {r.map((recipe: any, idx: any) => (
            <Card key={idx} recipe={recipe} idx={idx} />
          ))}
        </div>
      ) : (
        <div className="flex justify-center items-center h-full">
          <img src="/noRecipes.png" alt="No recipes available" />
        </div>
      )}
    </>
  );
}

export default Recipes;
