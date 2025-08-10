import { useState } from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import { IoIosCloseCircleOutline } from "react-icons/io";
import api from "../utils/api";
import getUser from "../utils/getUser";

function Panel({ setRecipes, setLoading, showNavbar, setShowNavbar }) {
  const [devices, setDevices] = useState("");
  const [ingredients, setIngredients] = useState("");
  const [allergies, setAllergies] = useState("");
  const [issues, setIssues] = useState("");
  const [navIcon, setNavIcon] = useState(true);

  const findRecipes = async () => {
    setLoading(true);
    const user = getUser();
    const response = await api.post("/recipe/api/cook", {
      _id: user._id,
      devices,
      ingredients,
      allergies,
      issues,
    });
    setRecipes(response.data);
    setLoading(false);
  };

  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-green-500 bg-green-600">
        <img src="logo.png" className="w-24 md:w-10/12" alt="logo" />
        <div className="md:hidden">
          {navIcon ? (
            <GiHamburgerMenu
              className="text-white cursor-pointer"
              size={28}
              onClick={() => {
                setShowNavbar(!showNavbar);
                setNavIcon(false);
              }}
            />
          ) : (
            <IoIosCloseCircleOutline
              className="text-white cursor-pointer"
              size={28}
              onClick={() => {
                setShowNavbar(!showNavbar);
                setNavIcon(true);
              }}
            />
          )}
        </div>
      </div>

      {/* Form */}
      <div
        className={`transition-all duration-300 ease-in-out md:flex flex-col flex-1 p-4 space-y-4 bg-green-50 ${showNavbar ? "block" : "hidden"
          }`}
      >
        <h1 className="text-sm font-semibold text-green-700 mb-1">Edit extra here or edit your profile</h1>
        {[
          {
            label: "Devices",
            value: devices,
            setValue: setDevices,
            placeholder: "Eg. Electric Kettle Only, Induction",
          },
          {
            label: "Ingredients",
            value: ingredients,
            setValue: setIngredients,
            placeholder: "Eg. Paneer, Peanuts, Besan",
          },
          {
            label: "Allergies",
            value: allergies,
            setValue: setAllergies,
            placeholder: "Eg. Lactose Intolerant",
          },
          {
            label: "Other Issues/Goals",
            value: issues,
            setValue: setIssues,
            placeholder: "Eg. Low Sodium Diet, Gain Wait",
          },
        ].map((field, idx) => (
          <div key={idx} className="flex flex-col">
            <label className="text-sm font-semibold text-green-700 mb-1">
              {field.label}
            </label>
            <input
              type="text"
              value={field.value}
              onChange={(e) => field.setValue(e.target.value)}
              placeholder={field.placeholder}
              className="w-full text-black p-2 rounded-lg border border-green-300 focus:outline-none focus:ring-2 focus:ring-green-500 shadow-sm"
            />
          </div>
        ))}

        {/* Submit Button */}
        <button
          onClick={findRecipes}
          className="mt-4 bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded-lg shadow-md transition-transform transform hover:scale-105"
        >
          🍲 Make Me Strong
        </button>
      </div>
    </div>
  );
}

export default Panel;
