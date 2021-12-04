import React from "react";
import {
  List,
  Datagrid,
  TextField,
  EmailField,
  BooleanField,
  useRefresh,
  BooleanInput,
  TextInput,
  TopToolbar,
  FilterButton,
} from "react-admin";
import useStyles from "./listStyles";
import { Button, Avatar } from "@material-ui/core";
import AdminService from "../../services/admin-service";
import { Lock, LockOpen } from "@material-ui/icons";

const AvatarField = ({ record }) => {
  return <Avatar alt="avatar" src={record.avatarUrl} />;
};

const LockButton = ({ record }) => {
  const refresh = useRefresh();

  return (
    <div style={{ textAlign: "center" }}>
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
    </div>
  );
};

const UserListAction = (props) => (
  <TopToolbar>
    <FilterButton />
  </TopToolbar>
);

const userFilters = [
  <BooleanInput label="Locked" source="isLocked" />,
  <TextInput label="Search" source="userName" alwaysOn />,
];

const UserList = (props) => {
  const classes = useStyles();

  return (
    <List {...props} filters={userFilters} actions={<UserListAction />}>
      <Datagrid className={classes.datagrid}>
        <AvatarField source="avatar" />
        <TextField source="userName" />
        <TextField source="displayName" />
        <EmailField source="email" />
        <BooleanField
          label="Status"
          source="isLocked"
          className={classes.align_center}
          TrueIcon={Lock}
          FalseIcon={LockOpen}
        />
        <LockButton />
      </Datagrid>
    </List>
  );
};

export default UserList;
