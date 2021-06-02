import React, { useEffect, useRef, useState } from "react";

import Header from "../home/components/Header";

import { useLoading } from "../../hooks/hooks";

import useStyles from "./styles/profileStyles";

import { UserService, PostService } from "../../services/services";

import {
  Avatar,
  Button,
  CircularProgress,
  Grid,
  Typography,
} from "@material-ui/core";

import {
  Person,
  Check,
  Favorite,
  ModeComment,
  PhotoLibrary,
} from "@material-ui/icons";

import UnfollowModal from "./components/UnfollowModal";
import PostDetailModal from "./components/PostDetailModal";

const Profile = ({ match }) => {
  const classes = useStyles();

  const unfollowModalRef = useRef(null);
  const postDetailModalRef = useRef(null);
  const fileInputRef = useRef(null);

  const [user, setUser] = useState({});
  const [isShowingUnfollow, setIsShowingUnfollow] = useState(false);
  const [isShowingPost, setIsShowingPost] = useState(false);
  const [posts, setPosts] = useState([]);
  const [postId, setPostId] = useState("");

  const { loading, onLoading, offLoading } = useLoading();

  const sourceUsername = localStorage.getItem("username");
  const targetUsername = match.params.username;

  const handleClick = () => {
    setIsShowingUnfollow(true);
  };

  const showPostDetail = (postId) => {
    setIsShowingPost(true);
    setPostId(postId);
  };

  const selectAvatar = () => {
    fileInputRef.current.click();
  };

  const uploadAvatar = (e) => {
    console.log(e.target.files[0]);
  };

  const follow = () => {
    onLoading();
    UserService.follow(sourceUsername, targetUsername).then((response) => {
      if (response.status === 200) {
        setUser({ ...user, isFollowed: true, followers: user.followers + 1 });
        offLoading();
      }
    });
  };

  useEffect(() => {
    UserService.getProfile(sourceUsername, targetUsername).then((response) => {
      if (response.status === 200) {
        setUser(response.data);
      }
    });

    PostService.getPostProfile(sourceUsername, targetUsername, 15).then(
      (response) => {
        if (response.status === 200) {
          setPosts(response.data);
        }
      }
    );

    const handleClickOutside = (event) => {
      if (
        unfollowModalRef.current &&
        !unfollowModalRef.current.contains(event.target)
      ) {
        setIsShowingUnfollow(false);
      }
      if (
        postDetailModalRef.current &&
        !postDetailModalRef.current.contains(event.target)
      ) {
        setIsShowingPost(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [sourceUsername, targetUsername, unfollowModalRef, postDetailModalRef]);

  return (
    <div className={classes.root}>
      <UnfollowModal
        avatar={user.avatarUrl ? user.avatarUrl : null}
        isShowing={isShowingUnfollow}
        modalRef={unfollowModalRef}
        toggleModal={setIsShowingUnfollow}
        sourceUsername={sourceUsername}
        targetUsername={user.userName ? user.userName : null}
        setUser={setUser}
      />
      <PostDetailModal
        isShowing={isShowingPost}
        modalRef={postDetailModalRef}
        postId={postId}
      />
      <Header />
      {Object.keys(user).length > 0 ? (
        <div className={classes.profile}>
          <div className={classes.content}>
            <div style={{ flexGrow: 3 }}>
              {sourceUsername !== targetUsername ? (
                <Avatar
                  src={user.avatarUrl ? user.avatarUrl : null}
                  className={classes.avatar}
                />
              ) : (
                <button className={classes.uploadButton} onClick={selectAvatar}>
                  <Avatar
                    src={user.avatarUrl ? user.avatarUrl : null}
                    className={classes.avatar}
                  />
                  <input
                    type="file"
                    hidden
                    accept="image/*"
                    ref={fileInputRef}
                    onChange={uploadAvatar}
                  />
                </button>
              )}
            </div>
            <div className={classes.info}>
              <div className={classes.infoPart}>
                <Typography variant="h5" className={classes.typo}>
                  {user.displayName}
                </Typography>
                {sourceUsername !== targetUsername ? (
                  user.isFollowed ? (
                    <div style={{ position: "relative" }}>
                      <Button
                        className={classes.button}
                        style={{
                          border: "1px solid #d9d9d9",
                          backgroundColor: "white",
                        }}
                        onClick={handleClick}
                        disabled={loading}
                      >
                        <Person className={classes.icon} />
                        <Check className={classes.icon} style={{ width: 15 }} />
                      </Button>
                      {loading && (
                        <CircularProgress
                          size={20}
                          className={classes.buttonProgress}
                        />
                      )}
                    </div>
                  ) : (
                    <div style={{ position: "relative" }}>
                      <Button
                        className={classes.button}
                        variant="contained"
                        color="primary"
                        disabled={loading}
                        onClick={follow}
                      >
                        Follow
                      </Button>
                      {loading && (
                        <CircularProgress
                          size={20}
                          className={classes.buttonProgress}
                        />
                      )}
                    </div>
                  )
                ) : (
                  <Button
                    className={classes.button}
                    style={{
                      border: "1px solid #d9d9d9",
                      backgroundColor: "white",
                    }}
                  >
                    Edit profile
                  </Button>
                )}
              </div>
              <div className={classes.infoPart}>
                <Typography variant="body1" className={classes.typo}>
                  <span style={{ fontWeight: "bold" }}>{user.posts} </span>
                  {user.posts > 1 ? "posts" : "post"}
                </Typography>
                <Typography variant="body1" className={classes.typo}>
                  <span style={{ fontWeight: "bold" }}>{user.followers} </span>
                  {user.followers > 1 ? "followers" : "follower"}
                </Typography>
                <Typography variant="body1" className={classes.typo}>
                  <span style={{ fontWeight: "bold" }}>{user.followings} </span>
                  {user.following > 1 ? "followings" : "following"}
                </Typography>
              </div>
              <div
                className={classes.infoPart}
                style={{ flexDirection: "column", alignItems: "flex-start" }}
              >
                <Typography variant="body1" style={{ fontWeight: "bold" }}>
                  {user.fullName ? user.fullName : user.userName}
                </Typography>
                <Typography variant="body1">
                  {user.bio ? user.bio : ""}
                </Typography>
              </div>
            </div>
          </div>
          <div className={classes.divider}></div>
          <Grid container className={classes.gallery} spacing={3}>
            {posts.length > 0
              ? posts.map((post) => (
                  <Grid
                    item
                    xs={12}
                    md={4}
                    sm={6}
                    lg={4}
                    className={classes.galleryItem}
                    key={post.id}
                    onClick={() => showPostDetail(post.id)}
                  >
                    <div className={classes.galleryOverlay}>
                      <img
                        alt="postImage"
                        className={classes.galleryImage}
                        src={post.postImages[0].url}
                      ></img>
                    </div>
                    {post.postImages.length > 1 ? (
                      <div className={classes.galleryItemType}>
                        <PhotoLibrary />
                      </div>
                    ) : null}
                    <div className={classes.galleryItemInfo}>
                      <ul>
                        <li>
                          <Favorite style={{ marginRight: 5 }} />
                          {post.likes}
                        </li>
                        <li>
                          <ModeComment style={{ marginRight: 5 }} />
                          {post.comments}
                        </li>
                      </ul>
                    </div>
                  </Grid>
                ))
              : null}
          </Grid>
        </div>
      ) : null}
    </div>
  );
};

export default Profile;
