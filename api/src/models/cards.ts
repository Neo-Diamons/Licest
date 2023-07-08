import { OkPacket, RowDataPacket } from "mysql2";
import cards from "../types/cards";
import connection from "../db/config";

export const getAllCards = (): Promise<cards[]> => {
    return new Promise((resolve, reject) => {
        const query = "SELECT * FROM Cards";

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
                    current: result.current,
                    publish: result.publish,
                });
            });

            resolve(card);
        });
    });
}

export const getCardsByStatus = (status: string): Promise<cards[]> => {
    return new Promise((resolve, reject) => {
        const query = "SELECT Cards.* FROM Cards INNER JOIN CardsStatus ON Cards.status_id = CardsStatus.id AND CardsStatus.name = ?";

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
                    current: result.current,
                    publish: result.publish,
                });
            });

            resolve(card);
        });
    });
}

export const getCard = (id: number): Promise<cards | null> => {
    return new Promise((resolve, reject) => {
        const query = "SELECT * FROM Cards WHERE id = ?";

        connection.query(query, [id], (error: any, results: RowDataPacket[]) => {
            if (error) {
                return reject(error);
            }

            if (results.length === 0) {
                resolve(null);
            }

            const dataType: cards = {
                id: results[0].id,
                name: results[0].name,
                image: results[0].image,
                season: results[0].season,
                current: results[0].current,
                publish: results[0].publish,
            };

            resolve(dataType);
        });
    });
}

export const createcard = (dataType: cards): Promise<cards> => {
    return new Promise((resolve, reject) => {
        const query = "INSERT INTO Cards (name, image, season, current, publish) VALUES (?, ?, ?, ?, ?)";

        connection.query(query, [dataType.name, dataType.image, dataType.season, dataType.current, dataType.publish], (error: any, results: OkPacket) => {
            if (error) {
                return reject(error);
            }

            resolve({
                id: results.insertId,
                name: dataType.name,
                image: dataType.image,
                season: dataType.season,
                current: dataType.current,
                publish: dataType.publish,
            });
        });
    });
}

export const updateCard = (id: number, dataType: cards): Promise<cards | null> => {
    return new Promise((resolve, reject) => {
        const query = "UPDATE Cards SET name = ?, image = ?, season = ?, current = ?, publish = ? WHERE id = ?";

        connection.query(query, [dataType.name, dataType.image, dataType.season, dataType.current, dataType.publish, id], (error: any, results: OkPacket) => {
            if (error) {
                return reject(error);
            }

            if (results.affectedRows === 0) {
                resolve(null);
            }

            resolve({
                id,
                name: dataType.name,
                image: dataType.image,
                season: dataType.season,
                current: dataType.current,
                publish: dataType.publish,
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
