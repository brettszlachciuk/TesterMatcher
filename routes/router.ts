import express, { Request, Response } from "express";
import * as model from "../models/findTesters";
import { TesterBugCount } from "../types/testerBugCount";

export const router = express.Router();

router.get("/:country/:device", async (req: Request, res: Response) => {
  const country: string = req.params.country;
  const device: string = req.params.device;
  model.findTesters(
    country,
    device,
    (err: Error, testerBugCounts: TesterBugCount[]) => {
      if (err) {
        return res.status(500).json({ errorMessage: err.message });
      }

      res.status(200).json({ data: testerBugCounts });
      console.log("Successful");
    }
  );
});

router.get("/", (req, res, next) => {
  console.log("Connected");
});
