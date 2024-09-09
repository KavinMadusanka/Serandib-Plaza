import { express } from 'express';
import { AddItem } from '../controllers/LostAndFoundController';
import { get } from './../node_modules/mongodb/src/utils';

const router = express.Router();

//
router.post('/addLostItem', AddItem);

router.get('/getLostItem', getLostItemController);


export default router;