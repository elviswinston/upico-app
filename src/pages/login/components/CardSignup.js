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

const CardSignup = () => {
  const classes = useStyles();
  const [animate, setAnimate] = useState(0);

  const [contact, setContact] = useState("");
  const [fullname, setFullname] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [contactMessage, setContactMessage] = useState("");
  const [fullnameMessage, setFullnameMessage] = useState("");
  const [usernameMessage, setUsernameMessage] = useState("");
  const [passwordMessage, setPasswordMessage] = useState("");

  const changeContact = (e) => {
    setContact(e.target.value);
  };

  const changeFullname = (e) => {
    setFullname(e.target.value);
  };

  const changeUsername = (e) => {
    setUsername(e.target.value);
  };

  const changePassword = (e) => {
    setPassword(e.target.value);
  };

  const signup = () => {
    if (contact === "") {
      setContactMessage("Mobile number or email is required.");
    } else {
      setContactMessage("");
    }
    if (fullname === "") {
      setFullnameMessage("Fullname is required.");
    } else {
      setFullnameMessage("");
    }
    if (username === "") {
      setUsernameMessage("Username is required.");
    } else if (username.length <= 6) {
      setUsernameMessage("Username must be more than 6 leters.");
    } else {
      setUsernameMessage("");
    }
    if (password === "") {
      setPasswordMessage("Password is required.");
    } else if (password.length <= 6) {
      setPasswordMessage("Password must be more than 6 letters.");
    } else {
      setPasswordMessage("");
    }
  };

  const { switchToSignin } = useContext(AccountContext);

  return (
    <Card className={classes.cardSignup} animate={animate}>
      <img src={logo} alt="title" className={classes.logo} />
      <CardContent>
        <div style={{ marginBottom: 30 }}>
          <Typography className={classes.text} variant="body1" gutterBottom>
            Mobile number or email
          </Typography>
          <TextField
            error={contactMessage && true}
            fullWidth
            autoFocus
            className={classes.textField}
            onChange={changeContact}
            helperText={contactMessage && contactMessage}
          />
        </div>
        <div style={{ marginBottom: 30 }}>
          <Typography className={classes.text} variant="body1" gutterBottom>
            Full name
          </Typography>
          <TextField
            error={fullnameMessage && true}
            fullWidth
            className={classes.textField}
            onChange={changeFullname}
            helperText={fullnameMessage && fullnameMessage}
          />
        </div>
        <div style={{ marginBottom: 30 }}>
          <Typography className={classes.text} variant="body1" gutterBottom>
            Username
          </Typography>
          <TextField
            error={usernameMessage && true}
            fullWidth
            className={classes.textField}
            onChange={changeUsername}
            helperText={usernameMessage && usernameMessage}
          />
        </div>
        <div style={{ marginBottom: 30 }}>
          <Typography className={classes.text} variant="body1" gutterBottom>
            Password
          </Typography>
          <TextField
            error={passwordMessage && true}
            fullWidth
            className={classes.textField}
            type="password"
            onChange={changePassword}
            helperText={passwordMessage && passwordMessage}
          />
        </div>
      </CardContent>
      <CardActions className={classes.cardAction}>
        <Button variant="outlined" className={classes.button} onClick={signup}>
          Sign up
        </Button>
        <Typography className={classes.link} style={{ padding: "0 40px" }}>
          By signing up, you agree to our Terms, Data Policy and Cookies Policy
        </Typography>
      </CardActions>
      <Typography
        className={classes.link}
        style={{ marginBottom: "10px", textAlign: "center" }}
      >
        Have an account?
        <Link
          href="#"
          className={classes.signUp}
          onClick={() => {
            switchToSignin();
            setAnimate(1);
          }}
        >
          Login
        </Link>
      </Typography>
    </Card>
  );
};

export default CardSignup;
