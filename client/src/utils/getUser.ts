import api from "./api";

export const getUser = () => {
    const user = localStorage.getItem("me");
    if (user) {
        return JSON.parse(user);
    }
    return null;
}

export const logoutUser = async () => {
    await api.post("/user/logout");
    localStorage.removeItem("me");
}
