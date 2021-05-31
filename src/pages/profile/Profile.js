import React, { useEffect, useRef, useState } from "react";

import Header from "../home/components/Header";

import useStyles from "./styles/profileStyles";

import AvatarService from "../../services/avatar.services";
import UserService from "../../services/user.services";

import avt from "../../assets/avatar.png";
import { Avatar, Button, Grid, Typography } from "@material-ui/core";

import PersonIcon from "@material-ui/icons/Person";
import CheckIcon from "@material-ui/icons/Check";
import FavoriteIcon from "@material-ui/icons/Favorite";
import ModeCommentIcon from "@material-ui/icons/ModeComment";

import UnfollowModal from "./components/UnfollowModal";

const Profile = ({ match }) => {
  const classes = useStyles();

  const modalRef = useRef(null);

  const [user, setUser] = useState({});
  const [displayName, setDisplayName] = useState("");
  const [avatar, setAvatar] = useState("");
  const [isShowing, setIsShowing] = useState(false);

  const sourceUsername = localStorage.getItem("username");
  const targetUsername = match.params.username;

  const handleClick = () => {
    setIsShowing(true);
  };

  useEffect(() => {
    UserService.getUserInfo(sourceUsername).then((response) => {
      if (response.status === 200) {
        setDisplayName(response.data.displayName);
      }
    });
    UserService.getProfile(sourceUsername, targetUsername).then((response) => {
      if (response.status === 200) {
        setUser(response.data);
      }
    });
    AvatarService.getUserAvatar(sourceUsername).then((response) => {
      response.status === 404 ? setAvatar(avt) : setAvatar(response.data.path);
    });

    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        setIsShowing(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [sourceUsername, targetUsername, modalRef]);

  return (
    <div className={classes.root}>
      <UnfollowModal
        avatar={user.avatarUrl ? user.avatarUrl : null}
        isShowing={isShowing}
        modalRef={modalRef}
        setIsShowing={setIsShowing}
        username={user.userName ? user.userName : null}
      />
      <Header displayName={displayName} avatar={avatar} />
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
                <button className={classes.uploadButton}>
                  <Avatar
                    src={user.avatarUrl ? user.avatarUrl : null}
                    className={classes.avatar}
                  />
                  <input type="file" hidden accept="image/*" />
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
                    <Button
                      className={classes.button}
                      style={{
                        border: "1px solid #d9d9d9",
                        backgroundColor: "white",
                      }}
                      onClick={handleClick}
                    >
                      <PersonIcon className={classes.icon} />
                      <CheckIcon
                        className={classes.icon}
                        style={{ width: 15 }}
                      />
                    </Button>
                  ) : (
                    <Button
                      className={classes.button}
                      variant="contained"
                      color="primary"
                      disableElevation
                    >
                      Follow
                    </Button>
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
            <Grid
              item
              xs={4}
              md={4}
              sm={4}
              lg={4}
              className={classes.galleryItem}
            >
              <div className={classes.galleryOverlay}>
                <img
                  alt="postImage"
                  src={avatar}
                  className={classes.galleryImage}
                ></img>
              </div>
              <div className={classes.galleryItemInfo}>
                <ul>
                  <li>
                    <FavoriteIcon /> 47
                  </li>
                  <li>
                    <ModeCommentIcon /> 10
                  </li>
                </ul>
              </div>
            </Grid>
          </Grid>
        </div>
      ) : null}
    </div>
  );
};

export default Profile;
