import React from "react";

import Header from "../../components/Header";

import useStyles from "./styles/profileStyles";

import UserProfile from "./components/UserProfile";
import GalleryProfile from "./components/GalleryProfile";

const Profile = ({ match }) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Header />
      <UserProfile targetUsername={match.params.username} />
      <GalleryProfile />
    </div>
  );
};

export default Profile;
