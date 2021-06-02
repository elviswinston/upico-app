import {
  Avatar,
  Button,
  Grid,
  TextareaAutosize,
  TextField,
  Typography,
} from "@material-ui/core";
import React from "react";

import useStyles from "./styles/updateAccountStyles";

const UpdateAccount = ({ avatar, user }) => {
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
          <button variant="body1" className={classes.action}>
            Change Avatar
          </button>
        </div>
      </Grid>
      <Grid item className={classes.gridItem}>
        <Typography variant="body1" className={classes.infoText}>
          Display Name
        </Typography>
        <div className={classes.gridItemInfo}>
          <TextField
            className={classes.textField}
            variant="outlined"
            InputProps={{
              classes: {
                input: classes.input,
              },
            }}
            value={user.displayName ? user.displayName : ""}
          />
        </div>
      </Grid>
      <Grid item className={classes.gridItem} style={{ paddingTop: 0 }}>
        <div style={{ flex: "1 0 0px", textAlign: "right" }}></div>
        <div style={{ flex: "2 0 0px", marginLeft: 20 }}>
          <Typography className={classes.description} style={{ marginTop: 0 }}>
            Get a display name you use often to make your account easier to
            find. It can be your full name, nickname, or business name.
          </Typography>
        </div>
      </Grid>
      <Grid
        item
        className={classes.gridItem}
        style={{ alignItems: "flex-start" }}
      >
        <Typography variant="body1" className={classes.infoText}>
          Bio
        </Typography>
        <div className={classes.gridItemInfo}>
          <TextareaAutosize
            className={classes.textArea}
            value={user.bio ? user.bio : ""}
          />
        </div>
      </Grid>
      <Grid item className={classes.gridItem}>
        <div style={{ flex: "1 0 0px", textAlign: "right" }}></div>
        <div style={{ flex: "2 0 0px", marginLeft: 20 }}>
          <Typography
            variant="body1"
            className={classes.description}
            style={{ fontWeight: "bold" }}
          >
            Personal Information
          </Typography>
          <Typography className={classes.description} style={{ marginTop: 0 }}>
            Provide your personal information, regardless of whether you use the
            account for business, pets or otherwise. This information will not
            be visible on your public profile.
          </Typography>
        </div>
      </Grid>
      <Grid item className={classes.gridItem}>
        <Typography variant="body1" className={classes.infoText}>
          Fullname
        </Typography>
        <div className={classes.gridItemInfo}>
          <TextField
            className={classes.textField}
            variant="outlined"
            InputProps={{
              classes: {
                input: classes.input,
              },
            }}
            value={user.fullname ? user.fullname : ""}
          />
        </div>
      </Grid>
      <Grid item className={classes.gridItem}>
        <Typography variant="body1" className={classes.infoText}>
          Phone
        </Typography>
        <div className={classes.gridItemInfo}>
          <TextField
            className={classes.textField}
            variant="outlined"
            InputProps={{
              classes: {
                input: classes.input,
              },
            }}
            value={user.phone ? user.phone : ""}
          />
        </div>
      </Grid>
      <Grid item className={classes.gridItem}>
        <Typography variant="body1" className={classes.infoText}>
          Email
        </Typography>
        <div className={classes.gridItemInfo}>
          <TextField
            className={classes.textField}
            variant="outlined"
            InputProps={{
              classes: {
                input: classes.input,
              },
            }}
            disabled
            value={user.email ? user.email : ""}
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
            Update
          </Button>
        </div>
      </Grid>
    </div>
  );
};

export default UpdateAccount;
