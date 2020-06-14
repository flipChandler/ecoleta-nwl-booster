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
    console.log('listagem de usuários');

    //response.send('Olá, companheiros!');

  return response.json(users);
});


//listar um usuario
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