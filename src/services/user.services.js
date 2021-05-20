import axios from "axios";
import authHeader from "./auth-header";

const API_URL = "http://localhost:5000/api/";

const getUserBoard = (username) => {
  return axios.get(API_URL + "Users/" + username, { headers: authHeader() });
};

const UserSevice = {
  getUserBoard,
};

export default UserSevice;
