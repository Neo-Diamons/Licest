import cardsRouter from "./routes/cardsRouter";
import express from "express";
import dotenv from "dotenv";

dotenv.config();

const app = express();

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    next();
});
app.use("/api/cards", cardsRouter);

app.listen(process.env.API_PORT, () => {
    console.log(`Server running on port ${process.env.API_PORT}`);
});
