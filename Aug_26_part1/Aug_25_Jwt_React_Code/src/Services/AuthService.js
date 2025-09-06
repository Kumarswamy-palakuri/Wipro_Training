import axios from "axios";

const AuthService = () => {

    const login = async (username, password) => {
        try {
            const response = await axios.post("https://localhost:7234/api/Auth/login", { username, password });
            
            if (response.data.token) {
                 alert(response.data.token);
                localStorage.setItem('token', response.data.token);
            }

            return response.data.token;
        } catch (error) {
            console.error("Login failed", error);
            throw error;
        }
    };

    return {
        login
    };
};

export default AuthService;