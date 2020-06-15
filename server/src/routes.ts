import express from 'express';

const routes = express.Router();

routes.use(express.json());

routes.get('/', (request, response) => {
    return response.json( { message: 'Olá, guerreiros!'});
   
 });

 export default routes;