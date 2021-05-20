import { Grid } from "@material-ui/core";
import React from "react";
import Header from "./components/Header";
import Post from "./components/Post";
import Suggestion from "./components/Suggestion";
import Upload from "./components/Upload";

import useStyles from "./styles/homeStyles";

const Home = () => {
  const classes = useStyles();
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
