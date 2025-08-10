import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import getUser from "../utils/getUser";
import api from "../utils/api";

interface Recipe {
    _id: string;
    name: string;
    description: string;
    ingredients: string[];
    instructions: string[];
    tip: string;
    type: string;
}

export default function Dashboard() {
    const navigate = useNavigate();
    const [savedRecipes, setSavedRecipes] = useState<Recipe[]>([]);
    const [user, setUser] = useState<any>(null);
    const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(null);

    useEffect(() => {
        async function getRecipes() {
            const userData = getUser();
            setUser(userData);

            try {
                const res = await api.post("/recipe/myRecipes", { _id: userData._id });
                if (res.data?.recipes) {
                    setSavedRecipes(res.data.recipes);
                } else {
                    setSavedRecipes([]);
                }
            } catch (err) {
                console.error(err);
            }
        }
        getRecipes();
    }, []);

    const handleLogout = async () => {
        await api.post("/user/logout");
        localStorage.removeItem("me");
        navigate("/");
    };

    return (
        <div className="min-h-screen bg-gray-100">
            {/* Top Navigation */}
            <nav className="bg-white shadow p-4 flex justify-between items-center sticky top-0 z-50">
                <h1
                    onClick={() => navigate("/dashboard")}
                    className="text-xl font-bold text-green-600 cursor-pointer"
                >
                    Welcome - {user?.name.split(" ")[0] || ""}
                </h1>
                <div className="flex items-center gap-3">
                    <button
                        onClick={() => navigate("/generate")}
                        className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition"
                    >
                        + Generate
                    </button>
                    <button
                        onClick={() => navigate("/profile")}
                        className="text-gray-700 hover:text-gray-900 transition"
                    >
                        Profile
                    </button>
                    <button
                        onClick={handleLogout}
                        className="text-red-500 hover:text-red-700 transition"
                    >
                        Logout
                    </button>
                </div>
            </nav>

            {/* Main Content */}
            <div className="max-w-6xl mx-auto p-6">
                <h2 className="text-2xl font-semibold mb-4">Saved Recipes</h2>
                {savedRecipes.length > 0 ? (
                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {savedRecipes.map((recipe) => (
                            <div
                                key={recipe._id}
                                className="bg-white shadow-md rounded-lg p-5 border hover:shadow-lg transition cursor-pointer"
                                onClick={() => setSelectedRecipe(recipe)}
                            >
                                <h3 className="text-lg font-bold text-green-600">{recipe.name}</h3>
                                <p className="text-gray-600 text-sm line-clamp-3">
                                    {recipe.description}
                                </p>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="flex flex-col justify-center items-center h-full text-gray-500">
                        <p className="text-gray-500">No saved recipes yet.</p>
                        <img
                            src="/noRecipes.png"
                            alt="No recipes available"
                            className="max-w-96 mb-4 opacity-80"
                        />

                    </div>
                )}
            </div>

            {/* Recipe Modal */}
            {selectedRecipe && (
                <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
                    <div className="bg-white rounded-lg max-w-2xl w-full p-6 shadow-lg relative overflow-y-auto max-h-[80vh]">
                        {/* Close Button */}
                        <button
                            className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
                            onClick={() => setSelectedRecipe(null)}
                        >
                            ✖
                        </button>

                        {/* Recipe Content */}
                        <h2 className="text-2xl font-bold text-green-600 mb-2">
                            {selectedRecipe.name}
                        </h2>
                        <p className="text-gray-700 mb-4">{selectedRecipe.description}</p>

                        <h3 className="text-lg font-semibold mt-4">Ingredients</h3>
                        <ul className="list-disc list-inside text-gray-600">
                            {selectedRecipe.ingredients.map((item, idx) => (
                                <li key={idx}>{item}</li>
                            ))}
                        </ul>

                        <h3 className="text-lg font-semibold mt-4">Instructions</h3>
                        <ol className="list-decimal list-inside text-gray-600 space-y-1">
                            {selectedRecipe.instructions.map((step, idx) => (
                                <li key={idx}>{step}</li>
                            ))}
                        </ol>

                        {selectedRecipe.tip && (
                            <p className="mt-4 text-green-700 italic">
                                💡 Tip: {selectedRecipe.tip}
                            </p>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}
