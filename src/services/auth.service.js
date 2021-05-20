import axios from "axios";

const API_URL = "http://localhost:5000/api/";

const register = (username, email, password) => {
  return axios.post(API_URL + "signup", {
    username,
    email,
    password,
  });
};

const login = (username, password) => {
  return axios
    .post(API_URL + "Users/authenticate", {
      username,
      password,
    })
    .catch((error) => {
      if (error.response) {
        return error.response;
      }
    })
    .then((response) => {
      return response;
    });
};

const logout = () => {
  localStorage.removeItem("user");
};

const getCurrentUser = () => {
  return JSON.parse(localStorage.getItem("user"));
};

const AuthService = {
  register,
  login,
  logout,
  getCurrentUser,
};

export default AuthService;
