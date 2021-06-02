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
import HomeOutlinedIcon from "@material-ui/icons/HomeOutlined";
import FavoriteIcon from "@material-ui/icons/FavoriteBorderOutlined";
import SearchIcon from "@material-ui/icons/Search";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";

import CircularProgress from "@material-ui/core/CircularProgress";

import logo from "../../../assets/logo.jpg";

import useStyles from "./styles/headerStyles";

import AuthService from "../../../services/auth.service";
import AvatarService from "../../../services/avatar.services";
import UserService from "../../../services/user.services";

import { useHistory } from "react-router";

const Header = ({ isHome }) => {
  const classes = useStyles();

  const inputRef = useRef(null);
  const profileRef = useRef(null);
  const searchRef = useRef(null);

  const history = useHistory();

  const username = localStorage.getItem("username");

  const [userMenu, setUserMenu] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isSearching, setIsSearching] = useState(0);
  const [searchUsers, setSearchUsers] = useState([]);
  const [searchKey, setSearchKey] = useState("");
  const [avatar, setAvatar] = useState("");
  const [displayName, setDisplayName] = useState("");

  const search = () => {
    setIsSearching(1);
    inputRef.current.focus();
  };

  const handleUserMenu = () => {
    setUserMenu(!userMenu);
  };

  const handleChange = (e) => {
    setSearchKey(e.target.value);
    setLoading(true);
    UserService.searchUser(e.target.value).then((response) => {
      if (response.status === 200) {
        setLoading(false);
        setSearchUsers(response.data);
      }
    });
  };

  const handleClick = (e, username) => {
    window.location.href = window.location.origin + "/" + username;
  };

  const logout = () => {
    AuthService.logout();
    window.location.reload();
  };

  const profile = (e) => {
    e.preventDefault();
    history.push(localStorage.getItem("username"));
  };

  useEffect(() => {
    AvatarService.getUserAvatar(username).then((response) => {
      response.status === 404 ? setAvatar(null) : setAvatar(response.data.path);
    });
    UserService.getUserInfo(username).then((response) => {
      if (response.status === 200) {
        setDisplayName(response.data.displayName);
      }
    });

    const handleClickOutside = (event) => {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setUserMenu(false);
      }
      if (
        searchRef.current &&
        !searchRef.current.contains(event.target) &&
        inputRef.current &&
        !inputRef.current.contains(event.target)
      ) {
        setIsSearching(0);
      }
    };
    
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [profileRef, searchRef, inputRef, username]);

  return (
    <div className={classes.root}>
      <Grid
        container
        justify="space-between"
        alignItems="center"
        className={classes.container}
      >
        <Grid item>
          <img
            src={logo}
            alt="Logo"
            className={classes.logo}
            onClick={() => {
              window.location.href = window.location.origin;
            }}
          />
        </Grid>
        <Grid item style={{ position: "relative" }}>
          <Paper className={classes.paper} onClick={search}>
            <SearchIcon className={classes.icon} icon="search" />
            <InputBase
              placeholder="Search"
              className={classes.input}
              search={isSearching}
              inputRef={inputRef}
              onChange={handleChange}
            />
          </Paper>
          <Paper
            className={classes.searchBox}
            active={isSearching ? 1 : 0}
            ref={searchRef}
          >
            {searchUsers.length > 0 ? null : (
              <div style={{ padding: 20 }}>
                <Typography
                  variant="h6"
                  style={{ fontSize: 16, fontWeight: "bold" }}
                >
                  Recently
                </Typography>
              </div>
            )}
            {searchUsers.length > 0 ? (
              loading ? (
                <div className={classes.progress}>
                  <CircularProgress size={30} />
                </div>
              ) : (
                <div style={{ marginTop: 20, overflowY: "auto" }}>
                  {searchUsers.map((user) => {
                    return (
                      <div
                        className={classes.searchUser}
                        key={user.id}
                        onClick={(e) => handleClick(e, user.username)}
                      >
                        <Avatar
                          alt="avatar"
                          src={user.avatarUrl ? user.avatarUrl : null}
                        />
                        <div
                          style={{ display: "flex", flexDirection: "column" }}
                        >
                          <Typography
                            variant="body1"
                            className={classes.text}
                            style={{ fontWeight: "bold" }}
                          >
                            {user.username}
                          </Typography>
                          <Typography variant="body1" className={classes.text}>
                            {user.displayName}
                          </Typography>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )
            ) : (
              <div className={classes.searchBoxContent}>
                <Typography
                  variant="body1"
                  style={{
                    fontSize: 14,
                    fontWeight: "bold",
                    color: "#8e8e8e",
                    textAlign: "center",
                  }}
                >
                  {searchKey ? "No result is found." : "No recent searches."}
                </Typography>
              </div>
            )}
          </Paper>
        </Grid>
        <Grid item style={{ display: "flex", position: "relative" }}>
          <IconButton
            className={classes.iconButton}
            onClick={() => {
              window.location.href = window.location.origin;
            }}
          >
            {isHome ? (
              <HomeIcon className={classes.icon} />
            ) : (
              <HomeOutlinedIcon className={classes.icon} />
            )}
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
            ref={profileRef}
          >
            <div className={classes.option} onClick={profile}>
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
