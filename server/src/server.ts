import express from 'express';

const app = express();

app.get('/users', (request, response) => {
    console.log('listagem de usuários');

    //response.send('Olá, companheiros!');

    response.json([
        'Felipe',
        'Diego',
        'Maik',
        'Suzana',
        'Janaina',
        'Josiani'
    ]);
});

app.listen(3333);