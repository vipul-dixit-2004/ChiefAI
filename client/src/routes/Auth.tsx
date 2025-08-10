import { useEffect, useState } from "react";
import api from "../utils/api";
import { useNavigate } from "react-router-dom";

export default function Auth({ children }) {
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        api.get("/user/me")
            .then((response) => {
                if (!response.data.user.isFlowComplete) {
                    alert(`Welcome ${response.data.user.name.split(" ")[0]}... Please complete your profile`)
                    navigate("/profile");
                }
                setLoading(false);
            })
            .catch(() => navigate("/login"));
    }, [navigate]);

    if (loading) return <p>Authentication...</p>;

    return children;
}
