import axios from "axios";

const API_URL = "http://localhost:5000/api/Users/";

const register = (username, email, password) => {
  return axios.post(API_URL + "signup", {
    username,
    email,
    password,
  });
};

const login = (username, password) => {
  return axios
    .post(API_URL + "authenticate", {
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

const isLoggedIn = () => {
  const token = localStorage.getItem("token");
  if (token) {
    return true;
  };
  return false;
};

const logout = () => {
  localStorage.removeItem("username");
};

const getCurrentUser = () => {
  return JSON.parse(localStorage.getItem("username"));
};

const AuthService = {
  register,
  login,
  isLoggedIn,
  logout,
  getCurrentUser,
};

export default AuthService;
