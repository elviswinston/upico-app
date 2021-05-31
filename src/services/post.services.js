import axios from "axios";

const API_URL = "http://localhost:5000/api/";

const createPost = (username, content) => {
  return axios
    .post(API_URL + "Posts", {
      userName: username,
      content: content,
    })
    .catch((error) => {
      if (error.response) return error.response;
    })
    .then((response) => {
      return response;
    });
};

const uploadImage = (postID, formData) => {
  return axios.post(API_URL + "postedImages/" + postID, formData);
};

const getPostUser = (username) => {
  return axios
    .get(API_URL + "Posts/user/" + username + "/10")
    .catch((error) => {
      return error.response;
    });
};

const getMorePost = (username, lastedPostId) => {
  return axios
    .get(API_URL + "Posts/user/" + username + "/" + lastedPostId + "/10")
    .catch((error) => {
      return error.response;
    });
};

const PostService = {
  createPost,
  uploadImage,
  getPostUser,
  getMorePost,
};

export default PostService;
