import express from 'express';
import knex from './database/connection'

const routes = express.Router();

routes.use(express.json());


routes.get('/items', async (request, response) => {
    // SELECT * FROM intems;    
    const items = await knex('items').select('*');

    const serializedItems = items.map(item => {
        return {
            id: item.id,
            title: item.title,
            image_url: `http://localhost:3333/uploads/${item.image}`,
        };
    });

    return response.json(serializedItems);   
 });


 routes.post('/points', async(request, response) => {
    //desestruturação do body em JS
    const { name, email, whatsapp, latitude, longitude, city, uf, items } = request.body;
    
    // trx -> caso a 2ª query falhar, não execute a primeira
    const trx = await knex.transaction();
    
    // image not null
    const insertedIds = await trx('points').insert({ 
        image: 'image-fake', 
        name, // nome da variavel é o mesmo do campo da tabela
        email, 
        whatsapp, 
        latitude, 
        longitude, 
        city, 
        uf 
    });

    const point_id = insertedIds[0]; // esse point_id é o msm que retorna na linha 45

    const pointItems = items.map((item_id: number) => {
        return {
            item_id,
            point_id,
        };
    });

    await trx('points_items').insert(pointItems);

    return response.json({ success: true });

 });




 export default routes;