import { Avatar, Paper, TextField, Typography } from "@material-ui/core";
import MoreIcon from "@material-ui/icons/MoreHoriz";
import AddAPhotoIcon from "@material-ui/icons/AddAPhoto";
import SendIcon from "@material-ui/icons/Send";

import React, { useRef, useState } from "react";
import ReactDOM from "react-dom";

import useStyles from "./styles/modalStyles";
import avatar from "../assets/avatar.jpg";

import PostService from "../services/post.services";

const Modal = ({ isShowing, hide, propRef }) => {
  const classes = useStyles();
  const [content, setContent] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);

  const fileInput = useRef(null);

  const handleChange = (e) => {
    setContent(e.target.value);
  };

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const handleClick = (e) => {
    fileInput.current.click();
  };

  const createPost = () => {
    const username = localStorage.getItem("username");
    if (content.length > 0) {
      PostService.createPost(username, content).then((response) => {
        const post = response.data;
        if (selectedFile) {
          const formData = new FormData();
          formData.append("postImage", selectedFile, selectedFile.name);

          PostService.uploadImage(post.id, formData);
        }
      });
      setContent("");
      hide();
    }
  };

  return isShowing
    ? ReactDOM.createPortal(
        <div>
          <div className={classes.modalOverflay}></div>
          <Paper className={classes.root} ref={propRef}>
            <div className={classes.header}>
              <div className={classes.avatarContainer}>
                <Avatar alt="avatar" src={avatar} className={classes.avatar} />
                <Typography className={classes.name}>Lãng Đế</Typography>
              </div>
              <MoreIcon className={classes.icon} />
            </div>
            <div style={{ padding: 10 }}>
              <TextField
                className={classes.textField}
                placeholder="What's on your mind ?"
                multiline
                rows={4}
                rowsMax={4}
                onChange={handleChange}
              ></TextField>
            </div>
            {selectedFile && (
              <img
                src={URL.createObjectURL(selectedFile)}
                alt={selectedFile.name}
                className={classes.previewImage}
              />
            )}
            <div className={classes.action}>
              <div className={classes.button} onClick={handleClick}>
                <AddAPhotoIcon className={classes.icon} />
              </div>
              <input
                type="file"
                hidden
                ref={fileInput}
                onChange={handleFileChange}
                accept="image/*"
              />
              <div className={classes.button} onClick={createPost}>
                <SendIcon className={classes.icon} />
              </div>
            </div>
          </Paper>
        </div>,
        document.body
      )
    : null;
};

export default Modal;
