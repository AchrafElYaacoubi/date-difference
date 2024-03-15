import Form from "@/components/Form";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import { Stack, Typography } from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import axios from "axios";
import { useEffect, useState } from "react";

export default function Home() {
  const [startDate, setStartDate] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    setIsLoading(true);
    axios
      .get("http://localhost:8000/date/")
      .then((response) => {
        console.log({ data: response.data });
        setStartDate(response.data.date);
      })
      .then(() => setIsLoading(false));
  }, []);

  if (isLoading) return "Loading...";

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Stack alignItems="center">
        <Stack p={3} width={600} spacing={4}>
          <Typography variant="h3" textAlign="center">
            {" "}
            Please fill the form
          </Typography>
          {startDate && <Form defaultStartDate={startDate} />}
        </Stack>
      </Stack>
    </LocalizationProvider>
  );
}
