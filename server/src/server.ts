import express from 'express';
import routes from './routes';
import cors from 'cors';
import path from 'path';

const app = express();

app.use(cors());
app.use(express.json()); // add a funcionalidade express.json() no projeto
app.use(routes); // importada de routes.ts

app.use('/uploads', express.static(path.resolve(__dirname, '..', 'uploads')));


app.listen(3333);