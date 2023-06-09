import express, { Request, Response } from 'express';
import mysql, { Connection } from 'mysql';
import dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();

// Create Express app
const app = express();
const port = 8080;

// Enable CORS for all routes
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    next();
});

// Create MySQL connection
const connection = mysql.createConnection({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.MYSQL_DATABASE,
    port: 3306,
});

// ...
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

// Define a route to fetch all users
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

// Start the server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
