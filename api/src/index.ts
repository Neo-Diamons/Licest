import statusRouter from "./routes/statusRouter";
import cardsRouter from "./routes/cardsRouter";
import express from "express";
import dotenv from "dotenv";

dotenv.config();

const app = express();

app.use(express.json());
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    next();
});
app.use("/api/cards", cardsRouter);
app.use("/api/status", statusRouter);

app.listen(process.env.API_PORT, () => {
    console.log(`Server running on port ${process.env.API_PORT}`);
});
