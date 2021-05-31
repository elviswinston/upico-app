import axios from "axios";
import authHeader from "./auth-header";

const API_URL = "http://localhost:5000/api/Users";

const getUserInfo = (username) => {
  return axios.get(API_URL + "/" + username, { headers: authHeader() });
};

const searchUser = (key) => {
  return axios.get(API_URL + "?key=" + key).catch((error) => {
    return error.response;
  });
};

const getProfile = (sourceUsername, targetUsername) => {
  return axios
    .get(
      API_URL +
        "/profile?sourceUsername=" +
        sourceUsername +
        "&targetUsername=" +
        targetUsername
    )
    .catch((error) => {
      return error.response;
    });
};

const follow = (sourceUsername, targetUsername) => {
  return axios
    .get(API_URL + "/" + sourceUsername + "/" + targetUsername)
    .catch((error) => {
      return error.response;
    });
};

const UserService = {
  getUserInfo,
  searchUser,
  getProfile,
  follow,
};

export default UserService;
