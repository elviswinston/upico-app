import React from "react";
import {
  List,
  Datagrid,
  TextField,
  DeleteButton,
  DateField,
} from "react-admin";

const ReportList = (props) => (
  <List {...props}>
    <Datagrid>
      <TextField source="postId" />
      <TextField source="numOfReports" />
      <DateField source="firstReportTime" locales="fr-FR" />
      <TextField source="firtsReporter" />
      <DeleteButton />
    </Datagrid>
  </List>
);

export default ReportList;
