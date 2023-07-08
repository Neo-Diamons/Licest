import express, { Request, Response } from "express";
import * as cardsModel from "../models/cards";
import Cards from "../types/cards";

const cardsRouter = express.Router();

cardsRouter.get("/", async (req: Request, res: Response) => {
    await cardsModel.getAllCards().then((dataTypes) => {
        res.status(200).json(dataTypes);
    }).catch((error) => {
        res.status(500).json({ error: error });
    });
});

cardsRouter.get("/:id", async (req: Request, res: Response) => {
    const id = parseInt(req.params.id);

    await cardsModel.getCard(id).then((dataType) => {
        if (dataType) {
            res.status(200).json(dataType);
        } else {
            console.log("Cards not found");
            res.status(404).json({ error: "Cards not found" });
        }
    }).catch((error) => {
        res.status(500).json({ error: error });
    });
});

cardsRouter.post("/", async (req: Request, res: Response) => {
    const dataType: Cards = {
        id: 0,
        name: req.body.name,
        image: req.body.image,
        season: req.body.season,
        current: req.body.current,
        publish: req.body.publish,
    };

    await cardsModel.createcard(dataType).then((dataType) => {
        res.status(201).json(dataType);
    }).catch((error) => {
        res.status(500).json({ error: error });
    });
});

cardsRouter.put("/:id", async (req: Request, res: Response) => {
    const id = parseInt(req.params.id);

    const dataType: Cards = {
        id: id,
        name: req.body.name,
        image: req.body.image,
        season: req.body.season,
        current: req.body.current,
        publish: req.body.publish,
    };

    await cardsModel.updateCard(id, dataType).then((dataType) => {
        res.status(200).json(dataType);
    }).catch((error) => {
        res.status(500).json({ error: error });
    });
});

cardsRouter.delete("/:id", async (req: Request, res: Response) => {
    const id = parseInt(req.params.id);

    await cardsModel.deleteCard(id).then(() => {
        res.status(204).end();
    }).catch((error) => {
        res.status(500).json({ error: error });
    });
});

cardsRouter.get("/status/:status", async (req: Request, res: Response) => {
    const status = req.params.status;

    await cardsModel.getCardsByStatus(status).then((dataTypes) => {
        res.status(200).json(dataTypes);
    }).catch((error) => {
        res.status(500).json({ error: error });
    });
});

export default cardsRouter;
