import {
  LineChart,
  Line,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";
import { Card, CardHeader, CardContent } from "@material-ui/core";
import {
  LocalizationProvider,
  DatePicker,
  AdapterDateFns,
  TextField,
} from "@material-ui/lab";
import { useEffect, useState } from "react";
import { getDateAccessCount } from "../../services/admin-service";

const AccessStatistic = () => {
  const [dateAccessCountData, setDateAccessCountData] = useState([]);

  useEffect(() => {
    const asyncFunc = async () => {
      const today = new Date();

      const dateAccessCounts = await getDateAccessCount(today);
      console.log(dateAccessCounts);
      setDateAccessCountData(
        dateAccessCounts.map((d) => {
          return {
            name: d.hour,
            uv: d.accessesCount,
            pv: 2400,
            amt: 2400,
          };
        })
      );
    };

    asyncFunc();
  }, []);

  return (
    <Card>
      <CardHeader title={"Accesses"} />
      <CardContent>
        <div style={{ width: "100%", height: 300 }}>
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DatePicker
              label="Basic example"
              value={value}
              onChange={(newValue) => {
                setValue(newValue);
              }}
              renderInput={(params) => <TextField {...params} />}
            />
          </LocalizationProvider>
          <ResponsiveContainer>
            <LineChart width={400} height={400} data={dateAccessCountData}>
              <Line type="monotone" dataKey="uv" stroke="#8884d8" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default AccessStatistic;
