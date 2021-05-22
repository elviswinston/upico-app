import {
  Avatar,
  Grid,
  IconButton,
  InputBase,
  Paper,
  Typography,
} from "@material-ui/core";
import React, { useRef, useState } from "react";

import HomeIcon from "@material-ui/icons/Home";
import FavoriteIcon from "@material-ui/icons/FavoriteBorderOutlined";
import SearchIcon from "@material-ui/icons/Search";

import logo from "../../../assets/logo.jpg";

import useStyles from "./styles/headerStyles";

const Header = ({ displayName, avatar }) => {
  const classes = useStyles();

  const textInput = useRef(null);

  const [isSearching, setIsSearching] = useState(0);

  const search = () => {
    setIsSearching(1);
    textInput.current.focus();
  };

  const blur = () => {
    setIsSearching(0);
  };

  return (
    <div className={classes.root}>
      <Grid
        container
        justify="space-between"
        alignItems="center"
        className={classes.container}
      >
        <Grid item>
          <img src={logo} alt="Logo" className={classes.logo} />
        </Grid>
        <Grid item>
          <Paper className={classes.paper} onClick={search}>
            <SearchIcon className={classes.icon} icon="search" />
            <InputBase
              placeholder="Search"
              className={classes.input}
              search={isSearching}
              inputRef={textInput}
              onBlur={blur}
            />
          </Paper>
        </Grid>
        <Grid item style={{ display: "flex" }}>
          <IconButton className={classes.iconButton}>
            <HomeIcon className={classes.icon} />
          </IconButton>
          <IconButton className={classes.iconButton}>
            <FavoriteIcon className={classes.icon} />
          </IconButton>
          <div className={classes.avatarContainer}>
            <Avatar alt="avatar" src={avatar} className={classes.avatar} />
            <Typography className={classes.name}>{displayName}</Typography>
          </div>
        </Grid>
      </Grid>
    </div>
  );
};

export default Header;
