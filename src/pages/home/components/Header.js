import {
  Avatar,
  Grid,
  IconButton,
  InputBase,
  Paper,
  Typography,
} from "@material-ui/core";
import React, { useEffect, useRef, useState } from "react";

import HomeIcon from "@material-ui/icons/Home";
import FavoriteIcon from "@material-ui/icons/FavoriteBorderOutlined";
import SearchIcon from "@material-ui/icons/Search";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";

import logo from "../../../assets/logo.jpg";

import useStyles from "./styles/headerStyles";

import AuthService from "../../../services/auth.service";

const Header = ({ displayName, avatar }) => {
  const classes = useStyles();
  const textInput = useRef(null);
  const wrapperRef = useRef(null);

  const [userMenu, setUserMenu] = useState(false);
  const [isSearching, setIsSearching] = useState(0);

  const search = () => {
    setIsSearching(1);
    textInput.current.focus();
  };

  const blur = () => {
    setIsSearching(0);
  };

  const handleUserMenu = () => {
    setUserMenu(!userMenu);
  };

  const logout = () => {
    AuthService.logout();
    window.location.reload();
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        setUserMenu(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [wrapperRef]);

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
        <Grid item style={{ display: "flex", position: "relative" }}>
          <IconButton className={classes.iconButton}>
            <HomeIcon className={classes.icon} />
          </IconButton>
          <IconButton className={classes.iconButton}>
            <FavoriteIcon className={classes.icon} />
          </IconButton>
          <div className={classes.avatarContainer} onClick={handleUserMenu}>
            <Avatar alt="avatar" src={avatar} className={classes.avatar} />
            <Typography className={classes.name}>{displayName}</Typography>
          </div>
          <Paper
            className={classes.user}
            active={userMenu ? 1 : 0}
            ref={wrapperRef}
          >
            <div className={classes.option}>
              <AccountCircleIcon className={classes.icon} />
              <Typography className={classes.text}>Profile</Typography>
            </div>
            <div className={classes.option} onClick={logout}>
              <ExitToAppIcon className={classes.icon} />
              <Typography className={classes.text}>Logout</Typography>
            </div>
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
};

export default Header;
