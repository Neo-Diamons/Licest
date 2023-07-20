import express, { Request, Response } from "express";
import * as statusModel from "../models/status";

const statusRouter = express.Router();

statusRouter.get("/", async (req: Request, res: Response) => {
    await statusModel.getCardsStatus().then((cards) => {
        res.status(200).json(cards);
    }).catch((error) => {
        res.status(500).json({ error: error });
    });
});

export default statusRouter;
