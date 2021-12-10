import React from "react";
import { Admin, Resource } from "react-admin";
import LoginPage from "./LoginPage";

import authProvider from "./authProvider";
import dataProvider from "./dataProvider";
import reports from "./Reports/index";
import users from "./Users/index";

import { Report, Group } from "@material-ui/icons";

export default function AdminApp() {
  return (
    <Admin
      loginPage={LoginPage}
      authProvider={authProvider}
      dataProvider={dataProvider}
    >
      <Resource
        name="reports"
        {...reports}
        icon={Report}
      />
      <Resource
        name="users"
        {...users}
        icon={Group}
      />
    </Admin>
  );
}
