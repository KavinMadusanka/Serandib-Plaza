import { express } from 'express';
import { AddItem } from '../controllers/LostAndFoundController';

const router = express.Router();

//
router.post('/addLostItem', AddItem);


export default router;