import { RowDataPacket } from "mysql2";
import status from "../types/status";
import connection from "../db/config";

export const getCardsStatus = (): Promise<status[]> => {
    return new Promise((resolve, reject) => {
        const query = "SELECT * FROM CardsStatus";

        connection.query(query, (error: any, results: RowDataPacket[]) => {
            if (error) {
                return reject(error);
            }

            const status: status[] = [];

            results.forEach((result) => {
                status.push({
                    id: result.id,
                    name: result.name,
                });
            });

            resolve(status);
        });
    });
}
