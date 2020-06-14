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
    const search = request.query.search;
    
    // no query do insomnia | name: search | value: an |  http://localhost:3333/users?search=an 
    console.log(search);// exibe o query param no cmd (an)

  return response.json(users);
});


//listar um usuario
// request.params == @PathVariable
// query param -> parametros opcionais dentro da rota
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