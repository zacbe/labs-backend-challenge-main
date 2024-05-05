import bodyParser from 'body-parser';
import { Router } from 'express';

import { deleteOrder, findOrder, insertOrder, updateOrder } from '../controllers/orders';

const orderRouter: Router = Router();

orderRouter.post('/orders', bodyParser.json(), insertOrder);
orderRouter.put('/orders/:orderId', updateOrder);
orderRouter.get('/orders/:orderId', findOrder);
orderRouter.delete('/orders/:orderId', deleteOrder);

export default orderRouter;
