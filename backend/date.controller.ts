import { differenceInDays, startOfDay } from "date-fns";
import { Request, Response } from "express";
import { z } from "zod";

const dateDiffBody = z.object({
  startDate: z.date(),
  endDate: z.date(),
});
type DateDiffBody = z.TypeOf<typeof dateDiffBody>;

export const fetchCurrentDate = (req: Request, res: Response) => {
  return res.status(200).json({
    date: startOfDay(new Date()).toISOString(),
  });
};

export const diffDates = (
  req: Request<{}, {}, DateDiffBody>,
  res: Response
) => {
  const body = req.body;
  const diff = differenceInDays(
    new Date(body.endDate),
    new Date(body.startDate)
  );
  if (diff <= 0)
    return res.status(403).json({
      status: "failed",
      message: "End date should be greater than start date!",
    });

  return res.status(200).json({
    status: "success",
    data: {
      diff,
    },
  });
};
