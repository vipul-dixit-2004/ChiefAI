const chief = require("../chief.js");

const recipes = async (req, res) => {
  const { devices, ingredients, allergies, issues } = req.body;
  const response = await chief.cook(devices, ingredients, allergies, issues);

  try {
    res.status(200).json(await JSON.parse(response));
  } catch (e) {
    console.log(e);
    res.status(400).json({ error: e });
  }
};

module.exports = {
  recipes,
};
