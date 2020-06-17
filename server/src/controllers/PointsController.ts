import { Request, Response } from 'express';
import knex from '../database/connection';

class PointsController{
    async create(request: Request, response: Response) {

        //desestruturação do body em JS
    const { name, email, whatsapp, latitude, longitude, city, uf, items } = request.body;
    
    // trx -> caso a 2ª query falhar, não execute a primeira
    const trx = await knex.transaction();

    const point = {
        image: 'image-fake', 
        name, // nome da variavel é o mesmo do campo da tabela
        email, 
        whatsapp, 
        latitude, 
        longitude, 
        city, 
        uf 
    };
    
    // image not null
    const insertedIds = await trx('points').insert(point) ;

    const point_id = insertedIds[0]; // esse point_id é o msm que retorna na linha 45

    const pointItems = items.map((item_id: number) => {
        return {
            item_id,
            point_id,
        };
    });

    await trx('points_items').insert(pointItems);

    await trx.commit();

    return response.json({ 
        id: point_id,
        ... point,
    });
    }
}

export default PointsController;