import axios, { all } from "axios";
import api from "../utils/api";
import { useState } from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import { IoIosCloseCircleOutline } from "react-icons/io";


function Panel({ setRecipes, setLoading, showNavbar, setShowNavbar }: any) {
  const [devices, setDevices] = useState("");
  const [ingredients, setIngredients] = useState("");
  const [allergies, setAllergies] = useState("");
  const [issues, setIssues] = useState("");
  const [navIcon, setNavIcon] = useState(true);

  const findRecipes = async (
    devices: string,
    ingredients: string,
    allergies: string,
    issues: string
  ) => {
    setLoading(true);
    const response = await api.post("/api/cook", {
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
        <div>
          <img src="logo.png" className="w-[90px] md:w-10/12 p-3" alt="logo" />
        </div>
        <div className="px-5 md:hidden">
          {navIcon ? (
            <GiHamburgerMenu
              color="white"
              size={"30px"}
              onClick={() => {
                const d: boolean = showNavbar;
                setShowNavbar(!d);
                setNavIcon(d);
              }}
            />
          ) : (
            <IoIosCloseCircleOutline
              color="white"
              size={"30px"}
              onClick={() => {
                const d: boolean = showNavbar;
                setShowNavbar(!d);
                setNavIcon(d);
              }}
            />
          )}
        </div>
      </div>
      <div
        className={`md:flex flex-col p-3 g-2 justify-evenly items-center
           
          
          ${showNavbar ? "" : "hidden"}`}
      >
        <div className="flex md:flex-col flex-row justify-evenly md:items-start items-center">
          <label htmlFor="">Devices:</label>
          <input
            type="text"
            onChange={(e) => {
              setDevices(e.target.value);
            }}
            value={devices}
            className="mb-2 rounded-sm p-2"
            placeholder="Eg. Electric Kettle, Induction"
          />
        </div>
        <div className="flex md:flex-col flex-row justify-evenly md:items-start items-center">
          <label htmlFor="ingredients">Ingredients:</label>
          <input
            type="text"
            id="ingredients"
            onChange={(e) => {
              setIngredients(e.target.value);
            }}
            value={ingredients}
            className="mb-2 rounded-sm p-2"
            placeholder="Eg. Panner,Peanuts,Besan"
          />
        </div>

        <div className="flex md:flex-col flex-row justify-evenly md:items-start items-center">
          <label htmlFor="allergies">Allergies:</label>

          <input
            type="text"
            id="allergies"
            onChange={(e) => {
              setAllergies(e.target.value);
            }}
            value={allergies}
            className="mb-2 rounded-sm p-2"
            placeholder="Eg. Lactose Intolerant"
          />
        </div>
        <div className="flex md:flex-col flex-row justify-evenly md:items-start items-center">
          <label htmlFor="issues">OtherIssues:</label>

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
        </div>
        <div className="flex md:flex-col flex-row justify-evenly md:items-start items-center">
          <button
            onClick={() => {
              findRecipes(devices, ingredients, allergies, issues);
            }}
            className="bg-green-500 p-2 rounded-xl text-white"
          >
            Make me Strong
          </button>
        </div>
      </div>
    </>
  );
}

export default Panel;
