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
    // image not null
    await knex('points').insert({ image: 'image-fake', name, email, whatsapp, latitude, longitude, city, uf });

    return response.json({ success: true });
 });




 export default routes;