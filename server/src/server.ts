import express from 'express';

const app = express();

// rota: endereço completo da requisição
// recurso: qual entidade estamos acessando do sistema

const users = [
    'Felipe',
    'Diego',
    'Maik',
    'Suzana',
    'Janaina',
    'Josiani'
];

//listar todos usuários
app.get('/users', (request, response) => {
    //http://localhost:3333/users?search=an
    const search = String(request.query.search);
    
   const filteredUsers = search ? users.filter(user => user.includes(search)) : users;

  return response.json(filteredUsers); // 

  /*[
  "Suzana",
  "Janaina",
  "Josiani"
   ] */
});


//listar um usuario
// request.params == @PathVariable
// query param -> parametros opcionais dentro da rota, filtro, paginação
app.get('/users/:id', (request, response) => {
    
    const id = Number (request.params.id);

    const user = users[id];

    return response.json(user);
})




// criar usuario
app.post('/users', (request, response) => {
    const user = {
        name: 'Felipe',
        email: 'felipe@gmail.com',
        idade: 33,
        peso: 67
    };

    return response.json(user);
});

app.listen(3333);