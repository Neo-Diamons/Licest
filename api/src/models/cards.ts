import { OkPacket, RowDataPacket } from "mysql2";
import cards from "../types/cards";
import connection from "../db/config";

export const getAllCards = (): Promise<cards[]> => {
    return new Promise((resolve, reject) => {
        const query = "SELECT cs.*, cst.name AS status FROM Cards AS cs INNER JOIN CardsStatus AS cst ON cs.status_id = cst.id";

        connection.query(query, (error: any, results: RowDataPacket[]) => {
            if (error) {
                return reject(error);
            }

            const card: cards[] = [];

            results.forEach((result) => {
                card.push({
                    id: result.id,
                    name: result.name,
                    image: result.image,
                    season: result.season,
                    publish: result.publish,
                    status_id: result.status_id
                });
            });

            resolve(card);
        });
    });
}

export const getCardsByStatus = (status: string): Promise<cards[]> => {
    return new Promise((resolve, reject) => {
        const query = "SELECT cs.*, cst.name AS status FROM Cards AS cs INNER JOIN CardsStatus AS cst ON cs.status_id = cst.id AND cst.name = ?";

        connection.query(query, [status], (error: any, results: RowDataPacket[]) => {
            if (error) {
                return reject(error);
            }

            const card: cards[] = [];

            results.forEach((result) => {
                card.push({
                    id: result.id,
                    name: result.name,
                    image: result.image,
                    season: result.season,
                    publish: result.publish,
                    status_id: result.status
                });
            });

            resolve(card);
        });
    });
}

export const getCard = (id: number): Promise<cards | null> => {
    return new Promise((resolve, reject) => {
        const query = "SELECT cs.*, cst.name AS status FROM Cards AS cs INNER JOIN CardsStatus AS cst ON cs.status_id = cst.id WHERE id = ?";

        connection.query(query, [id], (error: any, results: RowDataPacket[]) => {
            if (error) {
                return reject(error);
            }

            if (results.length === 0) {
                resolve(null);
            }

            const card: cards = {
                id: results[0].id,
                name: results[0].name,
                image: results[0].image,
                season: results[0].season,
                publish: results[0].publish,
                status_id: results[0].status
            };

            resolve(card);
        });
    });
}

export const createcard = (card: cards): Promise<cards> => {
    return new Promise((resolve, reject) => {
        const query = "INSERT INTO Cards (name, image, season, publish, status_id) VALUES (?, ?, ?, ?, ?)";

        connection.query(query, [card.name, card.image, card.season, card.publish, card.status_id], (error: any, results: OkPacket) => {
            if (error) {
                return reject(error);
            }

            resolve({
                id: results.insertId,
                name: card.name,
                image: card.image,
                season: card.season,
                publish: card.publish,
                status_id: card.status_id
            });
        });
    });
}

export const updateCard = (id: number, card: cards): Promise<cards | null> => {
    return new Promise((resolve, reject) => {
        const query = "UPDATE Cards SET name = ?, image = ?, season = ?, publish = ?, status_id = ? WHERE id = ?";

        connection.query(query, [card.name, card.image, card.season, card.publish, id], (error: any, results: OkPacket) => {
            if (error) {
                return reject(error);
            }

            if (results.affectedRows === 0) {
                resolve(null);
            }

            resolve({
                id,
                name: card.name,
                image: card.image,
                season: card.season,
                publish: card.publish,
                status_id: card.status_id
            });
        });
    });
}

export const deleteCard = (id: number): Promise<null | void> => {
    return new Promise((resolve, reject) => {
        const query = "DELETE FROM Cards WHERE id = ?";

        connection.query(query, [id], (error: any, results: OkPacket) => {
            if (error) {
                return reject(error);
            }

            if (results.affectedRows === 0) {
                resolve(null);
            }

            resolve();
        });
    });
}
