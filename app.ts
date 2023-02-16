import * as dotenv from "dotenv";
import express from "express";
import * as bodyParser from "body-parser";
import { router } from "./routes/router";

const app = express();
dotenv.config();

app.use(bodyParser.json());
app.use("/", router);

app.listen(process.env.PORT, () => {
  console.log("Node server started running");
});
