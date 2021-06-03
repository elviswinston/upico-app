import axios from "axios";

const API_URL = "http://localhost:5000/api/";

const createPost = (username, content) => {
  return axios
    .post(API_URL + "Posts", {
      userName: username,
      content: content,
    })
    .catch((error) => {
      return error.response;
    });
};

const getPostDetail = (username, postId) => {
  return axios
    .get(API_URL + "Posts?sourceUsername=" + username + "&postId=" + postId)
    .catch((error) => {
      return error.response;
    });
};

const uploadImage = (postID, formData) => {
  return axios.post(API_URL + "postedImages/" + postID, formData);
};

const getPostUser = (username) => {
  return axios
    .get(API_URL + "Posts/relatedPosts?username=" + username + "&numPosts=10")
    .catch((error) => {
      return error.response;
    });
};

const getMorePost = (username, latestPostId) => {
  return axios
    .get(
      API_URL +
        "Posts/moreRelatedPosts?username=" +
        username +
        "&latestPostId=" +
        latestPostId +
        "&numPosts=10"
    )
    .catch((error) => {
      return error.response;
    });
};

const getPostProfile = (sourceUsername, targetUsername) => {
  return axios
    .get(
      API_URL +
        "Posts/UserProfilePosts?sourceUsername=" +
        sourceUsername +
        "&targetUsername=" +
        targetUsername +
        "&numPosts=15"
    )
    .catch((error) => {
      return error.response;
    });
};

const getMorePostProfile = (sourceUsername, targetUsername, latestPostId) => {
  return axios
    .get(
      API_URL +
        "Posts/MoreUserProfilePosts?sourceUsername=" +
        sourceUsername +
        "&targetUsername=" +
        targetUsername +
        "&latestPostId=" +
        latestPostId +
        "&numPosts=15"
    )
    .catch((error) => {
      return error.response;
    });
};

const PostService = {
  createPost,
  getPostDetail,
  uploadImage,
  getPostUser,
  getMorePost,
  getPostProfile,
  getMorePostProfile,
};

export default PostService;
