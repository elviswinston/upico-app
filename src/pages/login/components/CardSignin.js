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

const CardSignin = () => {
  const classes = useStyles();
  const [animate, setAnimate] = useState(0);

  const { switchToSignup } = useContext(AccountContext);

  return (
    <Card className={classes.cardSignin} animate={animate}>
      <img src={logo} alt="title" className={classes.logo} />
      <CardContent>
        <Typography className={classes.text} variant="body1" gutterBottom>
          Username
        </Typography>
        <TextField
          fullWidth
          autoFocus
          className={classes.textField}
        ></TextField>
        <Typography className={classes.text} variant="body1" gutterBottom>
          Password
        </Typography>
        <TextField fullWidth className={classes.textField}></TextField>
      </CardContent>
      <CardActions className={classes.cardAction}>
        <Button variant="outlined" className={classes.button}>
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
