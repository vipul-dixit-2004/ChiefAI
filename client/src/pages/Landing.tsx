import { useNavigate } from "react-router-dom";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

export default function LandingPage() {
    const navigate = useNavigate();

    const data = [
        { name: "Vegetarian", recipes: 45 },
        { name: "Non-Veg", recipes: 32 },
        { name: "Eggetarian", recipes: 18 }
    ];

    return (
        <div className="min-h-screen flex flex-col bg-gray-50 text-gray-800">
            {/* Navbar */}
            <nav className="bg-white shadow-md px-6 py-4 flex justify-between items-center">
                <img src="/logo.png" className="w-16 h-16" alt="" />
                <div className="flex gap-4">
                    <button
                        onClick={() => navigate("/login")}
                        className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
                    >
                        Login
                    </button>
                    <button
                        onClick={() => navigate("/dashboard")}
                        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                    >
                        Dashboard
                    </button>
                </div>
            </nav>

            {/* Hero Section */}
            <header className="flex-1 flex flex-col items-center justify-center text-center px-6 py-16 bg-[url('/background.jpg')] bg-fixed bg-cover text-white">
                <h2 className="text-4xl md:text-5xl font-bold mb-4">
                    AI-Powered Recipe Generation
                </h2>
                <p className="max-w-xl mb-6 text-lg">
                    Discover, generate, and save recipes tailored to your preferences and dietary needs.
                    Let ChiefAI cook up something special for you!
                </p>
                <button
                    onClick={() => navigate("/generate")}
                    className="px-6 py-3 bg-white text-green-600 font-semibold rounded-lg shadow hover:bg-gray-100"
                >
                    Get Started
                </button>
            </header>

            {/* Features Section */}
            <section className="py-12 px-6 max-w-6xl mx-auto grid md:grid-cols-3 gap-8">
                <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg">
                    <h3 className="text-xl font-semibold mb-2">🍳 Recipe Generation</h3>
                    <p>Create unique recipes instantly with AI suggestions.</p>
                </div>
                <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg">
                    <h3 className="text-xl font-semibold mb-2">📌 Save & Organize</h3>
                    <p>Bookmark your favorite recipes and access them anytime.</p>
                </div>
                <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg">
                    <h3 className="text-xl font-semibold mb-2">⚙️ Personalized</h3>
                    <p>Adjust based on allergies, preferences, and diet types.</p>
                </div>
            </section>

            {/* Graph Section */}
            <section className="py-12 px-6 bg-gray-100">
                <h2 className="text-center text-2xl font-semibold mb-6">Recipes by Type</h2>
                <div className="h-72">
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={data}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="name" />
                            <YAxis />
                            <Tooltip />
                            <Bar dataKey="recipes" fill="#4ade80" />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
                <h1>(This Data is not correct yet)</h1>
            </section>

            {/* Footer */}
            <footer className="bg-gray-900 text-gray-300 py-6 px-6 mt-auto">
                <div className="flex flex-col md:flex-row justify-between items-center max-w-6xl mx-auto">
                    <p>© {new Date().getFullYear()} ChiefAI. All rights reserved.</p>
                    <p>Created with ❤️ by <span className="font-semibold text-white">Vipul Dixit</span></p>
                    <a
                        href="https://github.com/vipul-dixit-2004/ChiefAI"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-4 py-2 bg-gray-700 rounded hover:bg-gray-600"
                    >
                        GitHub Repo
                    </a>
                </div>
            </footer>
        </div>
    );
}
