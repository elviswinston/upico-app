import React from "react";
import { Admin, Resource } from "react-admin";
import LoginPage from "./LoginPage";

import authProvider from "./authProvider";
import dataProvider from "./dataProvider";
import reports from "./Reports/index";
import users from "./Users/index";
import AccessStatistic from "./statistics/accessStatistic";

import { Report, Group } from "@material-ui/icons";

import DashBoard from "./Dashboard/dashboard";
import ShowChartIcon from "@material-ui/icons/ShowChart";

export default function AdminApp() {
  return (
    <Admin
      loginPage={LoginPage}
      authProvider={authProvider}
      dataProvider={dataProvider}
      dashboard={DashBoard}
    >
      <Resource name="reports" {...reports} icon={Report} />
      <Resource name="users" {...users} icon={Group} />
      <Resource name="access" list={AccessStatistic} icon={ShowChartIcon} />
    </Admin>
  );
}
