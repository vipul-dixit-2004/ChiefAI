import { useState, useEffect } from "react";
import api from "../utils/api";
import { useNavigate } from "react-router-dom";

export default function Profile() {
    const [user, setUser] = useState<any>(null);
    const [form, setForm] = useState({
        name: "",
        email: "",
        password: "",
        gender: "",
        dietary_preference: "none",
        allergies: [] as string[],
        intolerances: [] as string[],
        profilePic: ""
    });
    const [editing, setEditing] = useState(false);
    const [allergyInput, setAllergyInput] = useState("");
    const [intoleranceInput, setIntoleranceInput] = useState("");
    const navigate = useNavigate();

    // Fetch user info
    useEffect(() => {
        api
            .get("/user/me")
            .then((res) => {
                setUser(res.data.user);
                console.log(res.data.user)
                setForm({
                    name: res.data.user.name,
                    email: res.data.user.email,
                    password: "",
                    gender: res.data.user.gender || "",
                    dietary_preference: res.data.user.dietary_preference,
                    allergies: res.data.user.allergies || [],
                    intolerances: res.data.user.intolerances || [],
                    profilePic: res.data.user.profilePic || ""
                });
            })
            .catch(() => navigate("/login"));
    }, [navigate]);

    const handleUpdate = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await api.put("/user/update", form);
            setEditing(false);
            const res = await api.get("/user/me");
            setUser(res.data.user);
        } catch (err: any) {
            alert(err.response?.data?.message || "Update failed");
        }
    };

    const handleLogout = async () => {
        await api.post("/user/logout");
        navigate("/login");
    };

    const addTag = (type: "allergies" | "intolerances") => {
        const value = type === "allergies" ? allergyInput.trim() : intoleranceInput.trim();
        if (value && !form[type].includes(value)) {
            setForm({ ...form, [type]: [...form[type], value] });
        }
        if (type === "allergies") setAllergyInput("");
        else setIntoleranceInput("");
    };

    const removeTag = (type: "allergies" | "intolerances", tag: string) => {
        setForm({ ...form, [type]: form[type].filter((t) => t !== tag) });
    };

    if (!user)
        return (
            <div className="flex items-center justify-center h-screen text-lg">
                Loading...
            </div>
        );

    return (
        <section className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 to-green-100 p-6">
            <div className="bg-white p-8 rounded-2xl shadow-2xl w-full max-w-3xl relative">

                {/* Top bar */}
                <div className="absolute top-4 right-4 flex gap-2">
                    <button
                        className="px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300 transition"
                        onClick={() => navigate("/dashboard")}
                    >
                        Dashboard
                    </button>
                    <button
                        className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
                        onClick={handleLogout}
                    >
                        Logout
                    </button>
                </div>

                {/* Profile Header */}
                <div className="flex flex-col items-center mb-6">
                    <div className="relative">
                        <img
                            src={form.profilePic || "https://via.placeholder.com/120"}
                            alt="Profile"
                            className="w-28 h-28 rounded-full object-cover border-4 border-green-500"
                        />

                    </div>
                    <h1 className="text-2xl font-bold text-green-600 mt-4">
                        {user.name}
                    </h1>
                    <p className="text-gray-500">{user.email}</p>
                </div>

                {!editing ? (
                    <>
                        <div className="space-y-3 text-gray-700 capitalize border-t pt-4">
                            <p><strong>Gender:</strong> {user.gender || "Not set"}</p>
                            <p><strong>Dietary Preference:</strong> {user.dietary_preference}</p>
                            <p><strong>Allergies:</strong> {user.allergies?.join(", ") || "None"}</p>
                            <p><strong>Intolerances:</strong> {user.intolerances?.join(", ") || "None"}</p>
                        </div>
                        <div className="flex justify-center mt-6">
                            <button
                                className="px-6 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition"
                                onClick={() => setEditing(true)}
                            >
                                Edit Profile
                            </button>
                        </div>
                    </>
                ) : (
                    <form onSubmit={handleUpdate} className="flex flex-col gap-4 border-t pt-4">
                        <input
                            className="border p-2 rounded-lg"
                            value={form.name}
                            onChange={(e) => setForm({ ...form, name: e.target.value })}
                            placeholder="Name"
                        />
                        <input
                            className="border p-2 rounded-lg"
                            value={form.email}
                            onChange={(e) => setForm({ ...form, email: e.target.value })}
                            placeholder="Email"
                        />
                        <input
                            type="password"
                            className="border p-2 rounded-lg"
                            value={form.password}
                            onChange={(e) => setForm({ ...form, password: e.target.value })}
                            placeholder="New Password (optional)"
                        />

                        {/* Gender */}
                        <select
                            className="border p-2 rounded-lg"
                            value={form.gender}
                            id={"gender"}
                            onChange={(e) => setForm({ ...form, gender: e.target.value })}
                        >
                            <option value="">Select Gender</option>
                            <option value="male">Male</option>
                            <option value="female">Female</option>
                            <option value="other">Other</option>
                        </select>
                        {form.gender == '' ?
                            <label htmlFor="gender" className="text-red-600">Select a valid one</label> : null}

                        {/* Dietary Preference */}
                        <select
                            className="border p-2 rounded-lg"
                            value={form.dietary_preference}
                            id={"dietary_preference"}
                            onChange={(e) =>
                                setForm({ ...form, dietary_preference: e.target.value })
                            }
                        >
                            <option value="none">Select One</option>
                            <option value="vegetarian">Vegetarian</option>
                            <option value="non-vegetarian">Non-Vegetarian</option>
                            <option value="eggetarian">Eggetarian</option>
                        </select>
                        {form.dietary_preference == 'none' ?
                            <label htmlFor="dietary_preference" className="text-red-600">Select a valid one</label> : null}

                        {/* Allergies */}
                        <div>
                            <label className="block font-semibold mb-1">Allergies</label>
                            <div className="flex gap-2 mb-2">
                                <input
                                    className="border p-2 rounded-lg flex-1"
                                    value={allergyInput}
                                    onChange={(e) => setAllergyInput(e.target.value)}
                                    placeholder="Add allergy"
                                    onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), addTag("allergies"))}
                                />
                                <button
                                    type="button"
                                    className="px-3 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
                                    onClick={() => addTag("allergies")}
                                >
                                    Add
                                </button>
                            </div>
                            <div className="flex flex-wrap gap-2">
                                {form.allergies.map((tag) => (
                                    <span
                                        key={tag}
                                        className="bg-green-100 text-green-700 px-3 py-1 rounded-full flex items-center gap-2"
                                    >
                                        {tag}
                                        <button
                                            type="button"
                                            className="text-red-500"
                                            onClick={() => removeTag("allergies", tag)}
                                        >
                                            ✖
                                        </button>
                                    </span>
                                ))}
                            </div>
                        </div>

                        {/* Intolerances */}
                        <div>
                            <label className="block font-semibold mb-1">Intolerances</label>
                            <div className="flex gap-2 mb-2">
                                <input
                                    className="border p-2 rounded-lg flex-1"
                                    value={intoleranceInput}
                                    onChange={(e) => setIntoleranceInput(e.target.value)}
                                    placeholder="Add intolerance"
                                    onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), addTag("intolerances"))}
                                />
                                <button
                                    type="button"
                                    className="px-3 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
                                    onClick={() => addTag("intolerances")}
                                >
                                    Add
                                </button>
                            </div>
                            <div className="flex flex-wrap gap-2">
                                {form.intolerances.map((tag) => (
                                    <span
                                        key={tag}
                                        className="bg-green-100 text-green-700 px-3 py-1 rounded-full flex items-center gap-2"
                                    >
                                        {tag}
                                        <button
                                            type="button"
                                            className="text-red-500"
                                            onClick={() => removeTag("intolerances", tag)}
                                        >
                                            ✖
                                        </button>
                                    </span>
                                ))}
                            </div>
                        </div>

                        <div className="flex gap-3 mt-2">
                            <button
                                type="submit"
                                className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
                            >
                                Save
                            </button>
                            <button
                                type="button"
                                className="px-4 py-2 bg-gray-400 text-white rounded-lg hover:bg-gray-500"
                                onClick={() => setEditing(false)}
                            >
                                Cancel
                            </button>
                        </div>
                    </form>
                )}
            </div>
        </section>
    );
}
