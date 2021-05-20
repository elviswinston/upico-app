import { Grid } from "@material-ui/core";
import React, { useEffect } from "react";
import Header from "./components/Header";
import Post from "./components/Post";
import Suggestion from "./components/Suggestion";
import Upload from "./components/Upload";

import useStyles from "./styles/homeStyles";

import UserService from "../../services/user.services";

const Home = () => {
  const classes = useStyles();

  useEffect(() => {
    const username = localStorage.getItem("username");
    const token = localStorage.getItem("token");

    if (token) {
      UserService.getUserBoard(username).then((response) => {
        console.log(response.data);
      });
    } else {
      window.location = window.location.origin + "/login";
    }
  }, []);

  return (
    <div className={classes.root}>
      <Header />
      <div className={classes.content}>
        <Upload />
        <Grid
          container
          className={classes.container}
          spacing={2}
          direction="column"
          justify="center"
          alignItems="center"
        >
          <Grid item style={{ padding: 0 }} xs={12} sm={4} md={4} lg={4}>
            <Post />
          </Grid>
        </Grid>
        <Suggestion />
      </div>
    </div>
  );
};

export default Home;
