import express from 'express';

const app = express();

app.use(express.json()); // add a funcionalidade express.json() no projeto
// rota: endereço completo da requisição
// recurso: qual entidade estamos acessando do sistema


app.get('/', (request, response) => {
   return response.json( { message: 'Olá, guerreiros!'});
  
});

app.listen(3333);