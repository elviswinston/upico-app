import { Button, Grid } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import Header from "./components/Header";
import Post from "./components/Post";
import Suggestion from "./components/Suggestion";
import Upload from "./components/Upload";

import useStyles from "./styles/homeStyles";

import PostService from "../../services/post.services";

const Home = () => {
  const classes = useStyles();
  const [posts, setPosts] = useState([]);

  const username = localStorage.getItem("username");

  useEffect(() => {
    PostService.getPostUser(username).then((response) => {
      setPosts(response?.data);
    });
  }, [username]);

  const handleClick = () => {
    const username = localStorage.getItem("username");
    const latestPostId = posts[posts.length - 1].id;

    PostService.getMorePost(username, latestPostId).then((response) => {
      if (response.status === 200) {
        response.data.length > 0
          ? setPosts(posts.concat(response.data))
          : alert("There are no more posts");
      }
    });
  };

  return (
    <div className={classes.root}>
      <Header isHome={true} />
      <div className={classes.content}>
        <Upload setPosts={setPosts} />
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
                style={{ padding: 0, marginBottom: 100, minWidth: 500 }}
                xs={12}
                sm={4}
                md={4}
                lg={4}
                key={post.id}
              >
                <Post post={post} />
              </Grid>
            ))}
          {posts.length > 0 && (
            <Button color="primary" onClick={handleClick}>
              More posts
            </Button>
          )}
        </Grid>
        <Suggestion />
      </div>
    </div>
  );
};

export default Home;
