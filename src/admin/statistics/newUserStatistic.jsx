import {
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip,
  BarChart,
  Bar,
  CartesianGrid,
} from "recharts";
import { Card, CardHeader, CardContent, Box, Tab } from "@material-ui/core";
import TabContext from "@material-ui/lab/TabContext";
import TabList from "@material-ui/lab/TabList";
import TabPanel from "@material-ui/lab/TabPanel";
import { useEffect, useState } from "react";
import {
  getDateNewUsersCount,
  getMonthNewUsersCount,
  getYearNewUsersCount,
} from "../../services/admin-service";
import DateFnsUtils from "@date-io/date-fns";
import {
  KeyboardDatePicker,
  MuiPickersUtilsProvider,
} from "@material-ui/pickers";

const NewUserStatistic = () => {
  const [dateCountData, setDateCountData] = useState([]);
  const [selectedDate, setSelectedDate] = useState(new Date());

  const [monthCountData, setMonthCountData] = useState([]);
  const [selectedMonth, setSelectedMonth] = useState(new Date());

  const [yearCountData, setYearCountData] = useState([]);
  const [selectedYear, setSelectedYear] = useState(new Date());

  const [tabValue, setTabValue] = useState("date");

  useEffect(() => {
    const asyncFunc = async () => {
      const dateAccessCounts = await getDateNewUsersCount(selectedDate);
      setDateCountData(
        dateAccessCounts.map((d) => {
          return {
            name: d.name,
            new: d.count,
            pv: 2400,
            amt: 2400,
          };
        })
      );
    };

    asyncFunc();
  }, [selectedDate]);

  useEffect(() => {
    const asyncFunc = async () => {
      const monthAccessCounts = await getMonthNewUsersCount(selectedMonth);
      setMonthCountData(
        monthAccessCounts.map((m) => {
          return {
            name: m.name,
            new: m.count,
            pv: 2400,
            amt: 2400,
          };
        })
      );
    };

    asyncFunc();
  }, [selectedMonth]);

  useEffect(() => {
    const asyncFunc = async () => {
      const yearAccessCounts = await getYearNewUsersCount(selectedYear);

      const monthNames = [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
      ];

      setYearCountData(
        yearAccessCounts.map((m) => {
          return {
            name: monthNames[Number(m.name) - 1],
            new: m.count,
            pv: 2400,
            amt: 2400,
          };
        })
      );
    };

    asyncFunc();
  }, [selectedYear]);

  return (
    <Card>
      <CardHeader title={"New Users"} />
      <CardContent>
        <Box>
          <TabContext value={tabValue}>
            <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
              <TabList
                variant="fullWidth"
                onChange={(event, newValue) => {
                  setTabValue(newValue);
                }}
              >
                <Tab label="Date" value="date" />
                <Tab label="Month" value="month" />
                <Tab label="Year" value="year" />
              </TabList>
            </Box>
            <TabPanel value="date">
              <Box width="100%" display="flex" justifyContent="right">
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                  <KeyboardDatePicker
                    variant="inline"
                    inputVariant="outlined"
                    label="Pick date"
                    format="MM/dd/yyyy"
                    value={selectedDate}
                    InputAdornmentProps={{ position: "end" }}
                    onChange={(date) => {
                      setSelectedDate(date);
                    }}
                  />
                </MuiPickersUtilsProvider>
              </Box>
              <div style={{ width: "100%", height: 300, marginTop: 10 }}>
                <ResponsiveContainer>
                  <BarChart width={600} height={300} data={dateCountData}>
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip
                      wrapperStyle={{ width: 100, backgroundColor: "#ccc" }}
                    />
                    <Bar dataKey="new" barSize={30} fill="#8884d8" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </TabPanel>
            <TabPanel value="month">
              <Box width="100%" display="flex" justifyContent="right">
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                  <KeyboardDatePicker
                    views={["year", "month"]}
                    variant="inline"
                    inputVariant="outlined"
                    label="Pick month"
                    value={selectedMonth}
                    InputAdornmentProps={{ position: "end" }}
                    onChange={(month) => {
                      setSelectedMonth(month);
                    }}
                  />
                </MuiPickersUtilsProvider>
              </Box>
              <div style={{ width: "100%", height: 300, marginTop: 10 }}>
                <ResponsiveContainer>
                  <BarChart width={600} height={300} data={monthCountData}>
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip
                      wrapperStyle={{ width: 100, backgroundColor: "#ccc" }}
                    />
                    <Bar dataKey="new" barSize={30} fill="#8884d8" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </TabPanel>
            <TabPanel value="year">
              <Box width="100%" display="flex" justifyContent="right">
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                  <KeyboardDatePicker
                    views={["year"]}
                    variant="inline"
                    inputVariant="outlined"
                    label="Pick year"
                    value={selectedYear}
                    InputAdornmentProps={{ position: "end" }}
                    onChange={(year) => {
                      setSelectedYear(year);
                    }}
                  />
                </MuiPickersUtilsProvider>
              </Box>
              <div style={{ width: "100%", height: 300, marginTop: 10 }}>
                <ResponsiveContainer>
                  <BarChart width={600} height={300} data={yearCountData}>
                    <XAxis dataKey="name" stroke="#8884d8" />
                    <YAxis />
                    <Tooltip
                      wrapperStyle={{ width: 100, backgroundColor: "#ccc" }}
                    />
                    <Bar dataKey="new" barSize={30} fill="#8884d8" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </TabPanel>
          </TabContext>
        </Box>
      </CardContent>
    </Card>
  );
};

export default NewUserStatistic;
