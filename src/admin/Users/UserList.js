import React from "react";
import {
  List,
  Datagrid,
  TextField,
  EmailField,
  BooleanField,
  useRefresh,
  BooleanInput,
  TopToolbar,
  FilterButton,
  CreateButton,
} from "react-admin";
import useStyles from "./listStyles";
import { Button, Avatar } from "@material-ui/core";
import AdminService from "../../services/admin-service";

const AvatarField = ({ record }) => {
  return <Avatar alt="avatar" src={record.avatarUrl} />;
};

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
      {record.isLocked ? "Unlock" : "Lock"}
    </Button>
  );
};

const UserListAction = (props) => (
  <TopToolbar>
    <FilterButton />
    <CreateButton />
  </TopToolbar>
);

const userFilters = [<BooleanInput label="Locked" source="isLocked" />];

const UserList = (props) => {
  const classes = useStyles();

  return (
    <List {...props} filters={userFilters} actions={<UserListAction />}>
      <Datagrid className={classes.datagrid}>
        <AvatarField source="avatar" />
        <TextField source="userName" />
        <TextField source="displayName" />
        <EmailField source="email" />
        <BooleanField source="isLocked" className={classes.boolean_field} />
        <LockButton />
      </Datagrid>
    </List>
  );
};

export default UserList;
