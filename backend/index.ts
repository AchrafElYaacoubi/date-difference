import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";
import express, { Application } from "express";
import { diffDates, fetchCurrentDate } from "./date.controller";

dotenv.config();

const app: Application = express();
const port = process.env.PORT || 8000;

const corsOptions = {
  origin: "http://localhost:3000",
};

app.use(cors(corsOptions));
app.use(bodyParser.json({ limit: "100mb" }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));

app.get("/date", fetchCurrentDate);

app.post("/date/diff", diffDates);

app.listen(port, () => {
  console.log(`Server is Fire at http://localhost:${port}`);
});
