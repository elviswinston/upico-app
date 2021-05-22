import axios from "axios";
import authHeader from "./auth-header";

const API_URL = "http://localhost:5000/api/Avatars/";

const getUserAvatar = (username) => {
  return axios.get(API_URL + username, { headers: authHeader() });
};

const AvatarService = {
  getUserAvatar,
};

export default AvatarService;