import { useEffect, useState } from "react";
import api from "../utils/api";
import { useNavigate } from "react-router-dom";

export default function Auth({ children }) {
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        api.get("/user/me")
            .then(() => {
                setLoading(false);
            })
            .catch(() => navigate("/login"));
    }, [navigate]);

    if (loading) return <p>Loading...</p>;

    return children;
}
