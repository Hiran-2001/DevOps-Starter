import mongoose from 'mongoose'
import { ItemModel } from '../models/item.model'
import logger from '../utils/logger'
import { Request, Response } from 'express'


export class ItemController {
    public static async getItems(requset: Request, response: Response): Promise<void> {
        try {
            const items = await ItemModel.find().sort({ createdAt: -1 })
            response.json(items)
        } catch (error) {
            logger.error('Error fetching items:', error)
            response.status(500).json({ error: 'Internal server error' })
        }
    }

    public static async getSingleItem(request: Request, response: Response): Promise<any> {
        try {
            const id = request.params.id;

            if (!mongoose.Types.ObjectId.isValid(id)) {
                return response.status(404).json({ error: 'Invalid ID format' });
            }

            const item = await ItemModel.findById(id);

            if (!item) {
              return  response.status(401).json('Item not found');
            }

          return  response.status(200).json(item)
        } catch (error) {
            logger.error('Error fetching item:', error)
           return response.status(500).json({ error: 'Internal server error' })
        }
    }

    public static async createItem(request: Request, response: Response) {
        try {
            const item = new ItemModel(request.body)
            await item.save()
            response.status(201).json(item)
        } catch (error) {
            logger.error('Error creating item:', error)
            response.status(400).json({ error: "Invalid item data" })
        }
    }
}