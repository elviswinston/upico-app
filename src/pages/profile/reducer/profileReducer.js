import React, {
  useReducer,
  useContext,
  createContext,
  useEffect,
  useState,
} from "react";

import { PostService, UserService } from "../../../services/services";

const ProfileStateContext = createContext();
const ProfileDispatchContext = createContext();

const reducer = (state, action) => {
  switch (action.type) {
    case "FETCH_SUCCESS":
      return action.payload;
    case "FETCH_ERROR":
      return [];
    case "LOAD_MORE_POST":
      return state.concat(action.morePosts);
    default:
      return state;
  }
};

const userReducer = (state, action) => {
  switch (action.type) {
    case "FETCH_SUCCESS":
      return action.payload;
    case "FETCH_ERROR":
      return {};
    case "UPLOAD_AVATAR":
      return { ...state, avatarUrl: action.path };
    default:
      return state;
  }
};

const ProfileProvider = (props) => {
  const [posts, postsDispatch] = useReducer(reducer, []);
  const [user, userDispatch] = useReducer(userReducer, {});
  const [targetUsername, setTargetUsername] = useState("");

  const sourceUsername = localStorage.getItem("username");

  useEffect(() => {
    if (targetUsername !== "") {
      PostService.getPostProfile(sourceUsername, targetUsername).then(
        (response) => {
          if (response.status === 200) {
            postsDispatch({ type: "FETCH_SUCCESS", payload: response.data });
          } else {
            postsDispatch({ type: "FETCH_ERROR" });
          }
        }
      );
      UserService.getProfile(sourceUsername, targetUsername).then(
        (response) => {
          if (response.status === 200) {
            userDispatch({ type: "FETCH_SUCCESS", payload: response.data });
          } else {
            userDispatch({ type: "FETCH_ERROR" });
          }
        }
      );
    }
  }, [sourceUsername, targetUsername]);

  const providerValue = {
    user,
    posts,
    targetUsername,
    setTargetUsername,
  };

  return (
    <ProfileDispatchContext.Provider
      value={{ postsDispatch: postsDispatch, userDispatch: userDispatch }}
    >
      <ProfileStateContext.Provider value={providerValue}>
        {props.children}
      </ProfileStateContext.Provider>
    </ProfileDispatchContext.Provider>
  );
};

export default ProfileProvider;

export const useProfile = () => useContext(ProfileStateContext);
export const useDispatchProfile = () => useContext(ProfileDispatchContext);
