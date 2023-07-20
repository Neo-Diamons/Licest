import express, {json, Request, Response} from "express";
import * as cardsModel from "../models/cards";
import Cards from "../types/cards";

const cardsRouter = express.Router();

cardsRouter.get("/", async (req: Request, res: Response) => {
    await cardsModel.getAllCards().then((cards) => {
        res.status(200).json(cards);
    }).catch((error) => {
        res.status(500).json({ error: error });
    });
});

cardsRouter.get("/:id", async (req: Request, res: Response) => {
    if (!req.params.id) {
        res.status(400).json({ error: "Invalid id" });
        return;
    }

    const id = parseInt(req.params.id);

    await cardsModel.getCard(id).then((card) => {
        if (card) {
            res.status(200).json(card);
        } else {
            res.status(404).json({ error: "CardsStatus not found" });
        }
    }).catch((error) => {
        res.status(500).json({ error: error });
    });
});

cardsRouter.post("/", async (req: Request, res: Response) => {
    if (!req.body) {
        res.status(400).json({ error: "Missing body" });
        return;
    }

    console.log(req);
    if (!req.body.name || !req.body.image || !req.body.status_id) {
        res.status(400).json({ error: "Invalid body" });
        return;
    }

    const card: Cards = {
        id: 0,
        name: req.body.name,
        image: req.body.image,
        season: req.body.season || 0,
        publish: req.body.publish || "",
        status_id: req.body.status_id
    };

    await cardsModel.createcard(card).then((card) => {
        res.status(201).json({card});
    }).catch((error) => {
        res.status(500).json({ error: error });
    });
});

cardsRouter.put("/:id", async (req: Request, res: Response) => {
    if (!req.params.id) {
        res.status(400).json({ error: "Invalid id" });
        return;
    }

    const id = parseInt(req.params.id);

    if (!req.body.name || !req.body.image || !req.body.season || !req.body.publish || !req.body.status_id) {
        res.status(400).json({ error: "Invalid body" });
        return;
    }

    const card: Cards = {
        id: id,
        name: req.body.name,
        image: req.body.image,
        season: req.body.season,
        publish: req.body.publish,
        status_id: req.body.status_id
    };

    await cardsModel.updateCard(id, card).then((card) => {
        res.status(200).json(card);
    }).catch((error) => {
        res.status(500).json({ error: error });
    });
});

cardsRouter.delete("/:id", async (req: Request, res: Response) => {
    if (!req.params.id) {
        res.status(400).json({ error: "Invalid id" });
        return;
    }

    const id = parseInt(req.params.id);

    await cardsModel.deleteCard(id).then(() => {
        res.status(204).end();
    }).catch((error) => {
        res.status(500).json({ error: error });
    });
});

cardsRouter.get("/status/:status", async (req: Request, res: Response) => {
    if (!req.params.status) {
        res.status(400).json({ error: "Invalid status" });
        return;
    }

    const status = req.params.status;

    await cardsModel.getCardsByStatus(status).then((cards) => {
        res.status(200).json(cards);
    }).catch((error) => {
        res.status(500).json({ error: error });
    });
});

export default cardsRouter;
