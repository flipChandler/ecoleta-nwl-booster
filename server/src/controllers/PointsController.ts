import { Request, Response } from 'express';
import knex from '../database/connection';

class PointsController{


    async index(request: Request, response: Response) {
        // cidade, uf, items (Query params)
        const { city, uf, items } = request.query;

        const parsedItems = String(items)
            .split(',')
            .map(item => Number(item.trim()));

        const points = await knex('points')
            .join('points_items', 'points.id', '=', 'points_items.point_id')
            .whereIn('points_items.item_id', parsedItems)
            .where('city', String(city))
            .where('uf', String(uf))
            .distinct()
            .select('points.*');


        return response.json(points);
    }

    async show(request: Request, response: Response) {
        const { id } = request.params; // desestruturação de const  id  = request.params.id;

        const point = await knex('points').where('id', id).first(); // first, a variavel deixa de ser um array

        if (!point) {
            return response.status(400).json({ messagem: 'Ponto de coleta não encontrado!' });
        }

        /**
         * SELECT * FROM items
         *    JOIN points_items ON items.id = points_items.item_id
         *      WHERE points_items.point_id = { id }
         */

         const items = await knex('items')
            .join('points_items', 'items.id', '=', 'points_items.item_id')
            .where('points_items.point_id', id) // id recuperado do request.params
            .select('items.title'); // desse join, só o titulo

        return response.json({ point, items });
    }


    async create(request: Request, response: Response) {

        //desestruturação do body em JS
    const { name, email, whatsapp, latitude, longitude, city, uf, items } = request.body;
    
    // trx -> caso a 2ª query falhar, não execute a primeira
    const trx = await knex.transaction();
    
    // parametros para a 1ª query, vindos do request.body
    const point = {
        image: 'https://images.unsplash.com/photo-1549031677-c596911f3d27?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=400&q=60', 
        name, // nome da variavel é o mesmo do campo da tabela (request.body)
        email, 
        whatsapp, 
        latitude, 
        longitude, 
        city, 
        uf 
    };
    
    // INSERT INTO points ... | 1ª query
    const insertedIds = await trx('points').insert(point) ;

    // point_id recebe o 1º elemento de insertedIds
    const point_id = insertedIds[0]; 

    //// parametro para a 2ª query | items do request.body
    const pointItems = items.map((item_id: number) => {
        return {
            item_id,
            point_id,
        };
    });

    //INSERT INTO points_items ... | 2ª query
    await trx('points_items').insert(pointItems);

    await trx.commit(); // NÃO PODE ESQUECER DE COMMIT QNDO TEM TRX

    return response.json({ 
        id: point_id,
        ... point, // retorna tudo que foi inserido
    });
    }
}
// 1:39
export default PointsController;