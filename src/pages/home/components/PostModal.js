import { Paper } from "@material-ui/core";

import { Public, Group } from "@material-ui/icons";

import React, { useEffect, useRef } from "react";

import useStyles from "./styles/modalStyles";
import { useLoading } from "../../../hooks/hooks";

import FullScreenLoading from "../../../components/FullscreenLoading";

import ReactDOM from "react-dom";
import { PostService } from "../../../services/services";

const PostModal = ({ isShowing, toggleModal, postId, auth }) => {
  const classes = useStyles();

  const modalRef = useRef(null);

  const { loading, onLoading, offLoading } = useLoading();

  const setPrivate = () => {
    onLoading();
    toggleModal();
    PostService.setPrivate(postId).then((response) => {
      if (response.status === 200) {
        offLoading();
      }
    });
  };

  const setPublic = () => {
    onLoading();
    toggleModal();
    PostService.setPublic(postId).then((response) => {
      if (response.status === 200) {
        offLoading();
      }
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
          {loading ? <FullScreenLoading /> : null}
          <div className={classes.modalOverlay}></div>
          <Paper className={classes.root} ref={modalRef}>
            {auth ? (
              <div style={{ width: "100%" }}>
                <div
                  className={classes.option}
                  style={{ color: "#0095f6", borderRadius: 15 }}
                  onClick={setPrivate}
                >
                  <Group className={classes.icon} />
                  Private
                </div>
                <div
                  className={classes.option}
                  style={{ color: "#0095f6" }}
                  onClick={setPublic}
                >
                  <Public className={classes.icon} />
                  Public
                </div>
                <div className={classes.option} style={{ color: "#ed4956" }}>
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
            <div className={classes.option} onClick={() => toggleModal()}>
              Cancel
            </div>
          </Paper>
        </div>,
        document.body
      )
    : null;
};

export default PostModal;
