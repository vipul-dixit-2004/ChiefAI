import { useState } from "react";
import api from "../utils/api";
import { useNavigate } from "react-router-dom";

const logo = {
    url: "/",
    src: "/logo.png",
    alt: "logo",
    title: "ChiefAI",
};

export default function LoginSignUp() {
    const [isLogin, setIsLogin] = useState(true);
    const [form, setForm] = useState({ name: "", email: "", password: "" });
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            let user;
            if (isLogin) {
                user = await api.post("/user/login", { email: form.email, password: form.password });
            } else {
                user = await api.post("/user/signup", form);

            }
            localStorage.setItem("me", JSON.stringify(user?.data));
            navigate("/dashboard");
        } catch (err: any) {
            alert(err.response?.data?.message || "Something went wrong");
        }
    };

    return (
        <section className="bg-muted h-screen">
            <div className="flex h-full items-center justify-center">
                <div className="flex flex-col items-center gap-6 lg:justify-start">
                    {/* Logo */}
                    <a href={logo.url}>
                        <img
                            src={logo.src}
                            alt={logo.alt}
                            title={logo.title}
                            className=" h-32"
                        />
                    </a>

                    {/* Form container */}
                    <form
                        onSubmit={handleSubmit}
                        className="min-w-sm border-muted bg-background flex w-full max-w-sm flex-col items-center gap-y-4 rounded-md border px-6 py-8 shadow-md"
                    >
                        <h1 className="text-xl font-semibold">{isLogin ? "Login" : "Sign Up"}</h1>

                        {/* Name field for sign-up */}
                        {!isLogin && (
                            <div className="flex w-full flex-col gap-2">
                                <label>Name</label>
                                <input
                                    type="text"
                                    placeholder="Name"
                                    className="text-sm"
                                    value={form.name}
                                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                                    required
                                />
                            </div>
                        )}

                        <div className="flex w-full flex-col gap-2">
                            <label>Email</label>
                            <input
                                type="email"
                                placeholder="Email"
                                className="text-sm"
                                value={form.email}
                                onChange={(e) => setForm({ ...form, email: e.target.value })}
                                required
                            />
                        </div>

                        <div className="flex w-full flex-col gap-2">
                            <label>Password</label>
                            <input
                                type="password"
                                placeholder="Password"
                                className="text-sm"
                                value={form.password}
                                onChange={(e) => setForm({ ...form, password: e.target.value })}
                                required
                            />
                        </div>

                        <button type="submit" className="w-full bg-purple-600 p-3 rounded-md text-white">
                            {isLogin ? "Login" : "Sign Up"}
                        </button>
                    </form>

                    {/* Switch between login/signup */}
                    <div className="text-muted-foreground flex justify-center gap-1 text-sm">
                        <p>{isLogin ? "Don't have an account?" : "Already have an account?"}</p>
                        <button
                            type="button"
                            onClick={() => setIsLogin(!isLogin)}
                            className="text-primary font-medium hover:underline"
                        >
                            {isLogin ? "Sign up" : "Login"}
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
}
