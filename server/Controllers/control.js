const cook = require("../recipe.js");

const recipes = async (req, res) => {
  console.log("req");
  const response = await cook.cook(
    "electric kettle",
    "peanuts,vegetables,sprount,moongdal",
    "none",
    "want to gain weight, no blender"
  );
  res.send(response);
};

module.exports = {
  recipes,
};
