import { Alert, Button, Stack } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";
import { yupResolver } from "@hookform/resolvers/yup";
import axios from "axios";
import * as yup from "yup";
import dayjs from "dayjs";
import { useState } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";

type Inputs = {
  startDate: Date;
  endDate: Date;
};

const schema = yup
  .object({
    startDate: yup.date().required(),
    endDate: yup.date().required(),
  })
  .required();

export default function Form({
  defaultStartDate,
}: {
  defaultStartDate: string;
}) {
  console.log({ defaultStartDate });
  const {
    handleSubmit,
    watch,
    control,
    formState: { errors },
  } = useForm<Inputs>({
    defaultValues: {
      startDate: dayjs(defaultStartDate).toDate(),
    },
    resolver: yupResolver(schema),
  });
  const [serverError, setServerError] = useState("");
  const [diffDate, setDiffDate] = useState("");

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    setServerError("");
    setDiffDate("");
    axios
      .post("http://localhost:8000/date/diff", data)
      .then((response) => {
        console.log("response.data.diff", response.data.diff);
        setDiffDate(response.data.data.diff);
      })
      .catch((error) => {
        setServerError(error.response.data.message);
      });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={2}>
        <Controller
          name="startDate"
          control={control}
          render={({ field, fieldState: { error } }) => (
            <DatePicker
              {...field}
              value={field.value ? dayjs(field.value) : null}
              slotProps={{
                textField: {
                  placeholder: "XX/XX/XX",
                  helperText: errors.startDate?.message,
                  error: !!error,
                },
              }}
              label="Start Date*"
            />
          )}
        />
        <Controller
          name="endDate"
          control={control}
          render={({ field, fieldState: { error } }) => (
            <DatePicker
              {...field}
              value={field.value ?? ""}
              slotProps={{
                textField: {
                  placeholder: "XX/XX/XX",
                  helperText: errors.endDate?.message,
                  error: !!error,
                },
              }}
              label="End Date*"
            />
          )}
        />

        {diffDate && <Alert severity="success">{diffDate}</Alert>}

        {serverError && <Alert severity="error">{serverError}</Alert>}
        <Button type="submit" variant="outlined">
          Submit
        </Button>
      </Stack>
    </form>
  );
}
