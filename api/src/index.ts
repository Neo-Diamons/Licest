import express, { Request, Response } from 'express';
import dotenv from 'dotenv';
import mysql from 'mysql';

dotenv.config();

const app = express();
const port = 8080;

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    next();
});

const connection = mysql.createConnection({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_ROOT_PASSWORD,
    database: process.env.MYSQL_DATABASE,
    port: 3306,
});

connection.connect((error: any) => {
    if (error) {
        console.error('Error connecting to MySQL:', error);
        return;
    }

    console.log('Connected to MySQL');
});

app.get('/', (req: Request, res: Response) => {
    res.send('Hello World!');
});

app.get('/cards', (req: Request, res: Response) => {
    const query = 'SELECT * FROM Cards';

    connection.query(query, (error: any, results: any[]) => {
        if (error) {
            console.error('Error executing MySQL query:', error);
            res.status(500).json({ error: 'Error executing query' });
            return;
        }

        res.json(results);
    });
});

app.get('/current', (req: Request, res: Response) => {
    const query = 'SELECT * FROM Cards WHERE current = 1';

    connection.query(query, (error: any, results: any[]) => {
        if (error) {
            console.error('Error executing MySQL query:', error);
            res.status(500).json({ error: 'Error executing query' });
            return;
        }

        res.json(results);
    });
});

app.get('/publish', (req: Request, res: Response) => {
    const query = 'SELECT * FROM Cards WHERE current = 0 AND publish IS NOT NULL';

    connection.query(query, (error: any, results: any[]) => {
        if (error) {
            console.error('Error executing MySQL query:', error);
            res.status(500).json({ error: 'Error executing query' });
            return;
        }

        res.json(results);
    });
});

app.get('/finish', (req: Request, res: Response) => {
    const query = 'SELECT * FROM Cards WHERE current = 0 AND publish IS NULL';

    connection.query(query, (error: any, results: any[]) => {
        if (error) {
            console.error('Error executing MySQL query:', error);
            res.status(500).json({ error: 'Error executing query' });
            return;
        }

        res.json(results);
    });
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
