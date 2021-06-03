import { Paper } from "@material-ui/core";

import { Public, Group, CheckCircle } from "@material-ui/icons";

import React, { useEffect, useRef } from "react";

import useStyles from "./styles/modalStyles";

import ReactDOM from "react-dom";
import { PostService } from "../../../services/services";

const PostModal = ({
  isShowing,
  toggleModal,
  postId,
  auth,
  privateMode,
  setPosts,
  postIndex,
  onLoading,
  offLoading,
}) => {
  const classes = useStyles();

  const modalRef = useRef(null);

  const setPrivate = () => {
    onLoading();
    toggleModal();
    PostService.setPrivate(postId).then((response) => {
      if (response.status === 200) {
        setPosts((prevPosts) => {
          let posts = [...prevPosts];
          let post = posts[postIndex];
          post.privateMode = true;
          posts[postIndex] = post;
          return posts;
        });
        offLoading();
      }
      document.body.style.overflow = "auto";
    });
  };

  const setPublic = () => {
    onLoading();
    toggleModal();
    PostService.setPublic(postId).then((response) => {
      if (response.status === 200) {
        setPosts((prevPosts) => {
          let posts = [...prevPosts];
          let post = posts[postIndex];
          post.privateMode = false;
          posts[postIndex] = post;
          return posts;
        });
        offLoading();
      }
      document.body.style.overflow = "auto";
    });
  };

  const removePost = () => {
    onLoading();
    toggleModal();
    PostService.deletePostImage(postId).then((response) => {
      if (response.status === 200) {
        PostService.deletePost(postId).then((response) => {
          if (response.status === 200) {
            setPosts((prevPosts) => {
              let posts = [...prevPosts];
              posts.splice(postIndex, 1);
              return posts;
            });
            offLoading();
          }
        });
      }
      document.body.style.overflow = "auto";
    });
  };

  isShowing && (document.body.style.overflow = "hidden");

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        toggleModal();
        document.body.style.overflow = "auto";
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [modalRef, toggleModal]);

  return isShowing
    ? ReactDOM.createPortal(
        <div>
          <div className={classes.modalOverlay}></div>
          <Paper className={classes.root} ref={modalRef}>
            {auth ? (
              <div style={{ width: "100%" }}>
                <div
                  className={classes.option}
                  style={{ color: "#0095f6", borderRadius: 15 }}
                  onClick={setPrivate}
                >
                  <div style={{ flex: "1 0 0px", textAlign: "right" }}>
                    <Group className={classes.icon} />
                  </div>
                  <div className={classes.iconContainer}>
                    Private
                    {privateMode && (
                      <CheckCircle className={classes.checkIcon} />
                    )}
                  </div>
                </div>
                <div
                  className={classes.option}
                  style={{ color: "#0095f6" }}
                  onClick={setPublic}
                >
                  <div style={{ flex: "1 0 0px", textAlign: "right" }}>
                    <Public className={classes.icon} />
                  </div>
                  <div className={classes.iconContainer}>
                    Public
                    {!privateMode && (
                      <CheckCircle className={classes.checkIcon} />
                    )}
                  </div>
                </div>
                <div
                  className={classes.option}
                  style={{ color: "#ed4956" }}
                  onClick={removePost}
                >
                  Remove
                </div>
              </div>
            ) : (
              <div
                className={classes.option}
                style={{ color: "#ed4956", borderRadius: 15 }}
              >
                Report
              </div>
            )}
            <div
              className={classes.option}
              onClick={() => {
                toggleModal();
                document.body.style.overflow = "auto";
              }}
            >
              Cancel
            </div>
          </Paper>
        </div>,
        document.body
      )
    : null;
};

export default PostModal;
