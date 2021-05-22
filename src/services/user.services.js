import axios from "axios";
import authHeader from "./auth-header";

const API_URL = "http://localhost:5000/api/Users/";

const getUserInfo = (username) => {
  return axios.get(API_URL + username, { headers: authHeader() });
};

const UserService = {
  getUserInfo,
};

export default UserService;
