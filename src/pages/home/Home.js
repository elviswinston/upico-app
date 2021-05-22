import { Grid } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import Header from "./components/Header";
import Post from "./components/Post";
import Suggestion from "./components/Suggestion";
import Upload from "./components/Upload";

import useStyles from "./styles/homeStyles";

import UserService from "../../services/user.services";
import PostService from "../../services/post.services";

import avt from "../../assets/avatar.png";

const Home = () => {
  const classes = useStyles();
  const [displayName, setDisplayName] = useState("");
  const [avatar, setAvatar] = useState("");
  const [posts, setPosts] = useState([]);

  const username = localStorage.getItem("username");
  const token = localStorage.getItem("token");
  console.log(token);

  useEffect(() => {
    UserService.getUserInfo(username).then((response) => {
      setDisplayName(
        response.data.displayName ? response.data.displayName : username
      );
      setAvatar(
        response.data.avatars.length > 0 ? response.data.avatars[0] : avt
      );
    });
    PostService.getPostUser(username).then((response) => {
      setPosts(response.data);
    });
  }, [username]);

  return (
    <div className={classes.root}>
      <Header displayName={displayName} avatar={avatar} />
      <div className={classes.content}>
        <Upload displayName={displayName} avatar={avatar} />
        <Grid
          container
          className={classes.container}
          spacing={0}
          direction="column"
          justify="center"
          alignItems="center"
        >
          {posts.length > 0 &&
            posts.map((post) => (
              <Grid
                item
                style={{ padding: 0, marginBottom: 100, minWidth: 400 }}
                xs={12}
                sm={4}
                md={4}
                lg={4}
                key={post.id}
              >
                <Post post={post} />
              </Grid>
            ))}
        </Grid>
        <Suggestion />
      </div>
    </div>
  );
};

export default Home;
