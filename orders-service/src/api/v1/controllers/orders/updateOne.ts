import { NextFunction, Request, Response } from 'express';
import createError from 'http-errors';

import { updateOrder } from '../../../../services';

export default async function handler(req: Request, res: Response, next: NextFunction): Promise<void> {
  const models = req.app.get('models');
  const { orderId } = req.params;
  const { body } = req;

  try {
    const { 0: result } = await updateOrder(orderId, body, models);
    const message = result ? 'Order updated' : 'Order not found';
    res.status(200).json({ message });
  } catch (e: any) {
    next(createError(500, e.message));
  }
}
