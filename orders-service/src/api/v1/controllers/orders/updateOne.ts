import { NextFunction, Request, Response } from 'express';
import createError from 'http-errors';

import { handleOrderUpdatedEvents as emmit } from '../../../../kafka/event-handlers';
import { updateOrder } from '../../../../services';

export default async function handler(req: Request, res: Response, next: NextFunction): Promise<void> {
  const models = req.app.get('models');
  const { orderId } = req.params;
  const { body } = req;

  try {
    const { 0: result } = await updateOrder(orderId, body, models);
    const message = result ? 'Order updated' : 'Order not found';

    if (result) await emmit({ orderid: orderId });

    res.status(result ? 202 : 404).json({ message });
  } catch (e: any) {
    console.error(`Error updating order ${orderId}:`, e.message);
    next(createError(500, e.message));
  }
}
