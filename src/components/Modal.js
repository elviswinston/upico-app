import { Avatar, Paper, TextField, Typography } from "@material-ui/core";
import MoreIcon from "@material-ui/icons/MoreHoriz";
import AddAPhotoIcon from "@material-ui/icons/AddAPhoto";
import SendIcon from "@material-ui/icons/Send";

import Photogrid from "./PhotoGrid";

import React, { useEffect, useRef, useState } from "react";
import ReactDOM from "react-dom";

import useStyles from "./styles/modalStyles";

import PostService from "../services/post.services";

const Modal = ({ isShowing, hide, propRef, displayName, avatar }) => {
  const classes = useStyles();
  const [content, setContent] = useState("");
  const [files, setFiles] = useState(null);
  const [data, setData] = useState([]);

  const fileInput = useRef(null);

  /*const setting = {
    width: "600px",
    height: ["250px", "170px"],
    layout: [1, 4],
    photos: data,
    showNumOfRemainingPhotos: true,
  };*/

  const handleChange = (e) => {
    setContent(e.target.value);
  };

  const handleFileChange = (e) => {
    setFiles(e.target.files);
  };

  const handleClick = (e) => {
    fileInput.current.click();
  };

  useEffect(() => {
    if (files) {
      for (let i = 0; i < files.length; i++) {
        setData((prevData) => [...prevData, URL.createObjectURL(files[i])]);
      }
    }
  }, [files]);

  const createPost = () => {
    const username = localStorage.getItem("username");
    if (content.length > 0) {
      PostService.createPost(username, content).then((response) => {
        const post = response.data;
        if (files) {
          const formData = new FormData();
          for (let i = 0; i < files.length; i++) {
            formData.append(`postImage[${i}]`, files[i], files[i].name);
          }

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
                <Typography className={classes.name}>{displayName}</Typography>
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
            <div style={{ padding: "0 10px" }}>
              {data.length > 0 && (
                <Photogrid images={data} maxWidth={540}></Photogrid>
              )}
            </div>
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
                multiple
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
