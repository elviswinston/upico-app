import React from "react";
import {
  List,
  Datagrid,
  TextField,
  EmailField,
  BooleanField,
  useRefresh,
} from "react-admin";
import useStyles from "./listStyles";
import { Button } from "@material-ui/core";
import AdminService from "../../services/admin-service";

const LockButton = ({ record }) => {
  const refresh = useRefresh();

  return (
    <Button
      variant="contained"
      style={{
        color: "#fff",
        backgroundColor: record.isLocked ? "#2196f3" : "#f44336",
      }}
      onClick={() => {
        AdminService.updateUserStatus(record.userName, !record.isLocked).then(
          () => refresh()
        );
      }}
    >
      {record.isLocked ? "Mở khoá" : "Khoá"}
    </Button>
  );
};

const UserList = (props) => {
  const classes = useStyles();

  return (
    <List {...props}>
      <Datagrid className={classes.datagrid}>
        <TextField source="id" />
        <TextField source="userName" />
        <TextField source="bio" />
        <TextField source="displayName" />
        <EmailField source="email" />
        <BooleanField source="isLocked" className={classes.boolean_field} />
        <LockButton />
      </Datagrid>
    </List>
  );
};

export default UserList;
