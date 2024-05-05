import { NextFunction, Request, Response } from 'express';
import createError from 'http-errors';

import { deleteOrder } from '../../../../services';

export default async function handler(req: Request, res: Response, next: NextFunction): Promise<void> {
  const models = req.app.get('models');
  const { orderId } = req.params;

  try {
    const result = await deleteOrder(orderId, models);
    const message = result ? 'Order deleted' : 'Order not found';
    res.status(202).json({ message });
  } catch (e: any) {
    next(createError(500, e.message));
  }
}
