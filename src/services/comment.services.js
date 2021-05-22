import axios from "axios";

const API_URL = "http://localhost:5000/api/Comments";

const comment = (username, content, postId) => {
  return axios.post(API_URL, { username, content, postId }).catch((error) => {
    return error.response;
  });
};

const CommentService = {
  comment,
};

export default CommentService;
