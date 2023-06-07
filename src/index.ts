import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import users from "./routes/users";
import index from "./routes/index";

dotenv.config();

const app: Express = express();
const port = process.env.PORT;

app.use('/', index);
app.use('/users', users);

app.listen(port, () => {
    console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});