import { Avatar, Paper, Typography } from "@material-ui/core";
import React, { useEffect, useRef, useState } from "react";

import { AddAPhoto, Create } from "@material-ui/icons";

import useStyles from "./styles/uploadStyles";

import useModal from "../../../hooks/useModal";

import Modal from "../../../components/Modal";

import { AvatarService, UserService } from "../../../services/services";

const Upload = ({ setPosts }) => {
  const classes = useStyles();

  const wrapperRef = useRef(null);
  const [upload, setUpload] = useState(false);
  const [files, setFiles] = useState(null);
  const [avatar, setAvatar] = useState("");
  const [displayName, setDisplayName] = useState("");

  const { isShowing, toggle } = useModal();

  const fileInput = useRef(null);

  const username = localStorage.getItem("username");

  const handleClick = () => {
    setUpload(true);
    toggle();
  };

  const handleFileChange = (e) => {
    if (files) {
      setFiles((prevFiles) =>
        Array.from(prevFiles).concat(Array.from(e.target.files))
      );
    } else setFiles(e.target.files);
  };

  useEffect(() => {
    AvatarService.getUserAvatar(username).then((response) => {
      response.status === 404 ? setAvatar(null) : setAvatar(response.data.path);
    });
    UserService.getProfile(username, username).then((response) => {
      if (response.status === 200) {
        setDisplayName(response.data.displayName);
      }
    });

    const handleClickOutside = (event) => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        setFiles(null);
        toggle();
      }
    };

    if (fileInput.current !== null && upload) {
      setUpload(false);
      fileInput.current.click();
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [wrapperRef, toggle, upload, username]);

  return (
    <Paper className={classes.root}>
      <Modal
        isShowing={isShowing}
        hide={toggle}
        propRef={wrapperRef}
        displayName={displayName}
        avatar={avatar}
        fileInput={fileInput}
        files={files}
        handleFileChange={handleFileChange}
        setPosts={setPosts}
        setFiles={setFiles}
      />
      <div className={classes.avatarContainer}>
        <Avatar alt="avatar" src={avatar} className={classes.avatar} />
        <Typography className={classes.name}>{displayName}</Typography>
      </div>
      <div className={classes.content}>
        <div className={classes.button} onClick={toggle}>
          <Create className={classes.icon} />
        </div>
        <div className={classes.button} onClick={handleClick}>
          <AddAPhoto className={classes.icon} />
        </div>
      </div>
    </Paper>
  );
};

export default Upload;
