import axios from "../utils/axios-customize";

const callRegister = (fullName, email, password, phone) => {
    return axios.post("/api/v1/user/register", {
        fullName,
        email,
        password,
        phone,
    });
};
const callLogin = (username, password) => {
    return axios.post("/api/v1/auth/login", { username, password });
};
const callFetchAccount = () => {
    return axios.get("/api/v1/auth/account");
};
const callLogout = () => {
    return axios.post("/api/v1/auth/logout");
};

export { callRegister, callLogin, callFetchAccount, callLogout };
