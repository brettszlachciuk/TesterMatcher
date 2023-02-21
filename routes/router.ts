import express, { Request, Response } from "express";
import * as model from "../models/findTesters";
import { TesterBugCount } from "../types/testerBugCount";

export const router = express.Router();

/**
 * Uses a URL with params '/:country/:device' to get the country and device desired to find testers.
 */
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

/**
 * Confirm connection to the server.
 */
router.get("/", (req, res, next) => {
  console.log("Connected");
});
