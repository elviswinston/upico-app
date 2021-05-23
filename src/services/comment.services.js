import axios from "axios";

const API_URL = "http://localhost:5000/api/Comments";

const getComment = (postId) => {
  return axios.get(API_URL + "?postId=" + postId).catch((error) => {
    return error.response;
  });
};

const comment = (username, content, postId) => {
  return axios
    .post(API_URL + "/comment", { username, content, postId })
    .catch((error) => {
      return error.response;
    });
};

const CommentService = {
  getComment,
  comment,
};

export default CommentService;
