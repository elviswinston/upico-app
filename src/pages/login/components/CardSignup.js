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

  const { switchToSignin } = useContext(AccountContext);

  return (
    <Card className={classes.cardSignup} animate={animate}>
      <img src={logo} alt="title" className={classes.logo} />
      <CardContent>
        <Typography className={classes.text} variant="body1" gutterBottom>
          Mobile number or email
        </Typography>
        <TextField
          fullWidth
          autoFocus
          className={classes.textField}
        ></TextField>
        <Typography className={classes.text} variant="body1" gutterBottom>
          Full name
        </Typography>
        <TextField fullWidth className={classes.textField}></TextField>
        <Typography className={classes.text} variant="body1" gutterBottom>
          Username
        </Typography>
        <TextField fullWidth className={classes.textField}></TextField>
        <Typography className={classes.text} variant="body1" gutterBottom>
          Password
        </Typography>
        <TextField
          fullWidth
          className={classes.textField}
          type="password"
        ></TextField>
      </CardContent>
      <CardActions className={classes.cardAction}>
        <Button variant="outlined" className={classes.button}>
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
