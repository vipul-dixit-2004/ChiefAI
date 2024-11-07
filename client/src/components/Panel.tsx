import axios, { all } from "axios";
import { useState } from "react";
import { GiHamburgerMenu } from "react-icons/gi";

function Panel({ setRecipes, setLoading }: any) {
  const [devices, setDevices] = useState("");
  const [ingredients, setIngredients] = useState("");
  const [allergies, setAllergies] = useState("");
  const [issues, setIssues] = useState("");

  const findRecipes = async (
    devices: string,
    ingredients: string,
    allergies: string,
    issues: string
  ) => {
    setLoading(true);
    const response = await axios.post("https://chiefai.onrender.com/api/cook", {
      devices,
      ingredients,
      allergies,
      issues,
    });
    setRecipes(response.data);
    setLoading(false);
  };
  return (
    <>
      <div className="flex items-center justify-between">
        <img src="logo.png" className="w-[90px] md:w-full p-3" alt="logo" />
        <div className="px-5 md:hidden">
          <GiHamburgerMenu color="white" size={"30px"} />
        </div>
      </div>
      <div className="md:flex flex-col p-3 g-2 justify-evenly hidden">
        <label htmlFor="">Devices:</label>
        <input
          type="text"
          onChange={(e) => {
            setDevices(e.target.value);
          }}
          value={devices}
          className="mb-2 rounded-sm p-2"
          placeholder="Devices you have"
        />
        <label htmlFor="ingredients">Ingredients:</label>

        <input
          type="text"
          id="ingredients"
          onChange={(e) => {
            setIngredients(e.target.value);
          }}
          value={ingredients}
          className="mb-2 rounded-sm p-2"
          placeholder="Ingredients"
        />
        <label htmlFor="allergies">Allergies:</label>

        <input
          type="text"
          id="allergies"
          onChange={(e) => {
            setAllergies(e.target.value);
          }}
          value={allergies}
          className="mb-2 rounded-sm p-2"
          placeholder="Allergies"
        />
        <label htmlFor="issues">Other Issues:</label>

        <input
          type="text"
          id="issues"
          onChange={(e) => {
            setIssues(e.target.value);
          }}
          value={issues}
          className="mb-2 rounded-sm p-2"
          placeholder="Other issues"
        />
        <button
          onClick={() => {
            findRecipes(devices, ingredients, allergies, issues);
          }}
          className="bg-green-500 p-2 rounded-xl text-white"
        >
          Make me Strong
        </button>
      </div>
    </>
  );
}

export default Panel;
