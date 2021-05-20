import React, { useContext, useState } from "react";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  TextField,
  Typography,
  Link,
} from "@material-ui/core";

import logo from "../../../assets/logo.jpg";
import useStyles from "./styles/cardStyles";

import AccountContext from "../accountContext";

import AuthService from "../../../services/auth.service";

const CardSignin = () => {
  const classes = useStyles();
  const [animate, setAnimate] = useState(0);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [usernameMessage, setUsernameMessage] = useState("");
  const [passwordMessage, setPasswordMessage] = useState("");

  const changeUsername = (e) => {
    setUsername(e.target.value);
  };

  const changePassword = (e) => {
    setPassword(e.target.value);
  };

  const login = () => {
    if (username === "") {
      setUsernameMessage("Username is required.");
    } else {
      setUsernameMessage("");
    }
    if (password === "") {
      setPasswordMessage("Password is required.");
    } else if (password.length < 6) {
      setPasswordMessage("Password cant be less than 6 letters.");
    } else {
      setPasswordMessage("");
    }

    if (usernameMessage === "" && passwordMessage === "") {
      AuthService.login(username, password).then((response) => {
        if (response.status === 400) {
          setUsernameMessage(response.data);
        } else {
          localStorage.setItem("token", JSON.stringify(response.data));
          localStorage.setItem("username", username);
          window.location = window.location.origin;
        }
      });
    }
  };

  const { switchToSignup } = useContext(AccountContext);

  return (
    <Card className={classes.cardSignin} animate={animate}>
      <img src={logo} alt="title" className={classes.logo} />
      <CardContent>
        <div style={{ marginBottom: 30 }}>
          <Typography className={classes.text} variant="body1" gutterBottom>
            Username
          </Typography>
          <TextField
            //error={usernameMessage > 0}
            fullWidth
            autoFocus
            className={classes.textField}
            onChange={changeUsername}
            //helperText={usernameMessage}
          />
        </div>
        <div style={{ marginBottom: 30 }}>
          <Typography className={classes.text} variant="body1" gutterBottom>
            Password
          </Typography>
          <TextField
            error={passwordMessage > 0}
            fullWidth
            className={classes.textField}
            onChange={changePassword}
            type="password"
            helperText={passwordMessage}
          />
        </div>
      </CardContent>
      <CardActions className={classes.cardAction}>
        <Button variant="outlined" className={classes.button} onClick={login}>
          Login
        </Button>
        <Link href="#" className={classes.link}>
          Forgot password?
        </Link>
      </CardActions>
      <Typography
        className={classes.link}
        style={{ marginBottom: "10px", textAlign: "center" }}
      >
        Don't have an account?
        <Link
          href="#"
          className={classes.signUp}
          onClick={() => {
            switchToSignup();
            setAnimate(1);
          }}
        >
          Sign up
        </Link>
      </Typography>
    </Card>
  );
};

export default CardSignin;
