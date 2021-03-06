import {
  LineChart,
  Line,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip,
  BarChart,
  Bar,
} from "recharts";
import { Card, CardHeader, CardContent, Box, Tab } from "@material-ui/core";
import TabContext from "@material-ui/lab/TabContext";
import TabList from "@material-ui/lab/TabList";
import TabPanel from "@material-ui/lab/TabPanel";
import { useEffect, useState } from "react";
import {
  getDateAccessCount,
  getMonthAccessCount,
  getYearAccessCount,
} from "../../services/admin-service";
import DateFnsUtils from "@date-io/date-fns";
import {
  KeyboardDatePicker,
  MuiPickersUtilsProvider,
} from "@material-ui/pickers";

const AccessStatistic = () => {
  const [dateAccessCountData, setDateAccessCountData] = useState([]);
  const [selectedDate, setSelectedDate] = useState(new Date());

  const [monthAccessCountData, setMonthAccessCountData] = useState([]);
  const [selectedMonth, setSelectedMonth] = useState(new Date());

  const [yearAccessCountData, setYearAccessCountData] = useState([]);
  const [selectedYear, setSelectedYear] = useState(new Date());

  const [tabValue, setTabValue] = useState("date");

  useEffect(() => {
    const asyncFunc = async () => {
      const dateAccessCounts = await getDateAccessCount(selectedDate);
      setDateAccessCountData(
        dateAccessCounts.map((d) => {
          return {
            name: d.hour,
            accesses: d.accessesCount,
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
      const monthAccessCounts = await getMonthAccessCount(selectedMonth);
      setMonthAccessCountData(
        monthAccessCounts.map((m) => {
          return {
            name: m.date,
            accesses: m.accessesCount,
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
      const yearAccessCounts = await getYearAccessCount(selectedYear);

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

      setYearAccessCountData(
        yearAccessCounts.map((m) => {
          return {
            name: monthNames[m.month - 1],
            accesses: m.accessesCount,
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
      <CardHeader title={"Accesses"} />
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
                  <LineChart
                    width={400}
                    height={400}
                    data={dateAccessCountData}
                  >
                    <Line type="monotone" dataKey="accesses" stroke="#8884d8" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                  </LineChart>
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
                  <LineChart
                    width={400}
                    height={400}
                    data={monthAccessCountData}
                  >
                    <Line type="monotone" dataKey="accesses" stroke="#8884d8" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                  </LineChart>
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
                  <LineChart
                    width={400}
                    height={400}
                    data={yearAccessCountData}
                  >
                    <Line type="monotone" dataKey="accesses" stroke="#8884d8" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </TabPanel>
          </TabContext>
        </Box>
      </CardContent>
    </Card>
  );
};

export default AccessStatistic;
