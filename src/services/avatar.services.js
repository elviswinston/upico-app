import axios from "axios";
import authHeader from "./auth-header";

const API_URL = "http://localhost:5000/api/avatars/";

const getUserAvatar = (username) => {
  return axios
    .get(API_URL + username + "/main", { headers: authHeader() })
    .catch((error) => {
      return error.response;
    });
};

const addAvatar = () => {};

const AvatarService = {
  getUserAvatar,
  addAvatar,
};

export default AvatarService;
