import express from 'express';
import routes from './routes';

const app = express();

app.use(express.json()); // add a funcionalidade express.json() no projeto
app.use(routes); // importada de routes.ts


app.listen(3333);