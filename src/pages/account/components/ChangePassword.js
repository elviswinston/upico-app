import { Avatar, Button, Grid, TextField, Typography } from "@material-ui/core";
import React from "react";

import useStyles from "./styles/changePasswordStyles";

const ChangePassword = ({ avatar, user }) => {
  const classes = useStyles();
  return (
    <div>
      <Grid item className={classes.gridItem}>
        <div style={{ flex: "1 0 0px" }}>
          <Avatar src={avatar} alt="avatar" className={classes.avatar} />
        </div>
        <div className={classes.gridItemInfo}>
          <Typography variant="body1" className={classes.username}>
            {user.userName ? user.userName : ""}
          </Typography>
        </div>
      </Grid>
      <Grid item className={classes.gridItem}>
        <Typography variant="body1" className={classes.infoText}>
          Old password
        </Typography>
        <div className={classes.gridItemInfo}>
          <TextField
            className={classes.textField}
            variant="outlined"
            type="password"
            InputProps={{
              classes: {
                input: classes.input,
              },
            }}
          />
        </div>
      </Grid>
      <Grid item className={classes.gridItem}>
        <Typography variant="body1" className={classes.infoText}>
          New password
        </Typography>
        <div className={classes.gridItemInfo}>
          <TextField
            className={classes.textField}
            variant="outlined"
            type="password"
            InputProps={{
              classes: {
                input: classes.input,
              },
            }}
          />
        </div>
      </Grid>
      <Grid item className={classes.gridItem}>
        <Typography variant="body1" className={classes.infoText}>
          Confirm password
        </Typography>
        <div className={classes.gridItemInfo}>
          <TextField
            className={classes.textField}
            variant="outlined"
            type="password"
            InputProps={{
              classes: {
                input: classes.input,
              },
            }}
          />
        </div>
      </Grid>
      <Grid item className={classes.gridItem}>
        <div style={{ flex: "1 0 0px", textAlign: "right" }}></div>
        <div style={{ flex: "2 0 0px", marginLeft: 20 }}>
          <Button
            color="primary"
            variant="contained"
            style={{ textTransform: "inherit" }}
          >
            Change password
          </Button>
        </div>
      </Grid>
    </div>
  );
};

export default ChangePassword;
