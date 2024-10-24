import axios from "../utils/axios-customize";

const callRegisterAPI = (fullName, email, password, phone) => {
    return axios.post("/api/v1/user/register", {
        fullName,
        email,
        password,
        phone,
    });
};

export { callRegisterAPI };
