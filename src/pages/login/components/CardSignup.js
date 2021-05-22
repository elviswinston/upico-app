import React, { useContext, useState } from "react";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  TextField,
  Typography,
  Link,
  Divider,
} from "@material-ui/core";

import logo from "../../../assets/logo.jpg";
import useStyles from "./styles/cardStyles";

import AccountContext from "../accountContext";

import AuthService from "../../../services/auth.service";

const CardSignup = () => {
  const classes = useStyles();
  const [animate, setAnimate] = useState(0);

  const [email, setEmail] = useState("");
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [emailMessage, setEmailMessage] = useState("");
  const [firstnameMessage, setFirstnameMessage] = useState("");
  const [lastnameMessage, setLastnameMessage] = useState("");
  const [usernameMessage, setUsernameMessage] = useState("");
  const [passwordMessage, setPasswordMessage] = useState("");

  //const [isError, setIsError] = useState(false);

  const changeEmail = (e) => {
    setEmail(e.target.value);
  };

  const changeFirstname = (e) => {
    setFirstname(e.target.value);
  };

  const changeLastname = (e) => {
    setLastname(e.target.value);
  };

  const changeUsername = (e) => {
    setUsername(e.target.value);
  };

  const changePassword = (e) => {
    setPassword(e.target.value);
  };

  const signup = (e) => {
    e.preventDefault();
    if (email === "") {
      setEmailMessage("Email is required.");
    } else if (
      !RegExp(/[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,15}/g).test(email)
    ) {
      setEmailMessage("Invalid email");
    } else {
      setEmailMessage("");
    }
    if (firstname === "") {
      setFirstnameMessage("Firstname is required.");
    } else {
      setFirstnameMessage("");
    }
    if (lastname === "") {
      setLastnameMessage("Lastname is required.");
    } else {
      setLastnameMessage("");
    }
    if (username === "") {
      setUsernameMessage("Username is required.");
    } else {
      setUsernameMessage("");
    }
    if (password === "") {
      setPasswordMessage("Password is required.");
    } else if (
      !RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{6,})").test(password)
    ) {
      setPasswordMessage(
        "Password must be six charaters and contain at least lowercase character, uppercase character, numeric character."
      );
    } else {
      setPasswordMessage("");
    }

    if (
      !usernameMessage &&
      !passwordMessage &&
      !emailMessage &&
      !firstnameMessage &&
      !lastnameMessage &&
      username &&
      password &&
      email &&
      firstname &&
      lastname
    ) {
      const fullname = firstname + " " + lastname;
      AuthService.register(
        username,
        password,
        email,
        firstname,
        lastname,
        fullname
      ).then((response) => {
        if (response.status === 20) {
          alert("Đăng ký thành công");
        } else {
          console.log(response.data);
        }
      });
    }
  };

  const { switchToSignin } = useContext(AccountContext);

  return (
    <Card className={classes.cardSignup} animate={animate}>
      <img src={logo} alt="title" className={classes.logo} />
      <CardContent>
        <div style={{ marginBottom: 30 }}>
          <Typography className={classes.text} variant="body1" gutterBottom>
            Email
          </Typography>
          <TextField
            error={emailMessage > 0}
            fullWidth
            autoFocus
            className={classes.textField}
            onChange={changeEmail}
            helperText={emailMessage && emailMessage}
          />
        </div>
        <div
          style={{
            marginBottom: 30,
            display: "flex",
          }}
        >
          <div>
            <Typography className={classes.text} variant="body1" gutterBottom>
              Firstname
            </Typography>
            <TextField
              error={firstnameMessage > 0}
              fullWidth
              className={classes.textField}
              onChange={changeFirstname}
              helperText={firstnameMessage && firstnameMessage}
            />
          </div>
          <Divider
            orientation="vertical"
            style={{ margin: "0 10px" }}
            flexItem
          />
          <div>
            <Typography className={classes.text} variant="body1" gutterBottom>
              Lastname
            </Typography>
            <TextField
              error={lastnameMessage > 0}
              fullWidth
              className={classes.textField}
              onChange={changeLastname}
              helperText={lastnameMessage && lastnameMessage}
            />
          </div>
        </div>
        <div style={{ marginBottom: 30 }}>
          <Typography className={classes.text} variant="body1" gutterBottom>
            Username
          </Typography>
          <TextField
            error={usernameMessage > 0}
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
            error={passwordMessage > 0}
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
