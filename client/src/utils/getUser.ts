const getUser = () => {
    const user = localStorage.getItem("me");
    if (user) {
        return JSON.parse(user);
    }
    return null;
}
export default getUser;