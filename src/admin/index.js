import React from "react";
import { Admin, Resource } from "react-admin";
import LoginPage from "./LoginPage";

import dataProvider from "./dataProvider";

import reports from "./Reports";

export default function AdminApp() {
  return (
    <Admin loginPage={LoginPage} dataProvider={dataProvider}>
      <Resource name="admin" {...reports} />
    </Admin>
  );
}
