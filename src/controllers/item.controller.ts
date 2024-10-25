import { ItemModel } from '../models/item.model' 
import logger from '../utils/logger'
import {Request,Response} from 'express'


export class ItemController {
    public static async getItems(requset: Request, response:Response): Promise<void>{
        try {
            const items = await ItemModel.find().sort({createdAt: -1})
            response.json(items)
        } catch (error) {
            logger.error('Error fetching items:', error)
            response.status(500).json({error: 'Internal server error'})
        }
    }

    public static async createItem(request: Request, response: Response){
        try {
            const item = new ItemModel(request.body)
            await item.save()
            response.status(201).json(item)
        } catch (error) {
            logger.error('Error creating item:', error)
            response.status(400).json({error: "Invalid item data"})
        }
    }
}