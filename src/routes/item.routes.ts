import { Router } from 'express';
import { ItemController } from '../controllers/item.controller';

const router = Router();

router.get('/', ItemController.getItems);
router.get('/:id',ItemController.getSingleItem)
router.post('/', ItemController.createItem);

export default router;