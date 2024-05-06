import { NextFunction, Request, Response } from 'express';
import createError from 'http-errors';

import { handleOrderDeletedEvents as emmit } from '../../../../kafka/event-handlers';
import { deleteOrder } from '../../../../services';

export default async function handler(req: Request, res: Response, next: NextFunction): Promise<void> {
  const models = req.app.get('models');
  const { orderId } = req.params;

  try {
    const result = await deleteOrder(orderId, models);
    const message = result ? 'Order deleted' : 'Order not found';

    if (result) await emmit({ orderid: orderId });

    res.status(result ? 202 : 404).json({ message });
  } catch (e: any) {
    console.error(`Error deleting order ${orderId}:`, e.message);
    next(createError(500, e.message));
  }
}
