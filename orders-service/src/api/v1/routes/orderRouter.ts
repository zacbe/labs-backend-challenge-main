import { Router } from 'express';

import { deleteOrder, findAllOrders, findOrder, insertOrder, updateOrder } from '../controllers/orders';

const orderRouter: Router = Router();

orderRouter.post('/orders', insertOrder);
orderRouter.put('/orders/:orderId', updateOrder);
orderRouter.get('/orders/:orderId', findOrder);
orderRouter.get('/orders', findAllOrders);
orderRouter.delete('/orders/:orderId', deleteOrder);

export default orderRouter;
