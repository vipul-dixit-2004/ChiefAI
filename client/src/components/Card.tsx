import React from "react";

function Card({ recipe, idx }: any) {
  return (
    <>
      <div className="rounded-3xl h-[200px] p-4 mb-3 bg-slate-600 min-w-full text-white">
        {/* heading title */}
        <h1 className="text-4xl text-wrap">{`${idx + 1}. ${recipe.name}`}</h1>
        {/* description */}
        <p className="ml-5 text-xl py-2 px-3">---- {recipe.description}</p>
      </div>
    </>
  );
}

export default Card;
