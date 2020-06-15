import express from 'express';

const app = express();

app.use(express.json()); // add a funcionalidade express.json() no projeto
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
// request body -> paramteros para a criação e atualização de informações
app.get('/users/:id', (request, response) => {
    
    const id = Number (request.params.id);

    const user = users[id];

    return response.json(user);
})




// criar usuario
app.post('/users', (request, response) => {
    const data = request.body;

    console.log(data);

    const user = {
        name: data.name,
        email: data.email,
        idade: data.idade,
        peso: data.peso
    };

    return response.json(user);
});

app.listen(3333);