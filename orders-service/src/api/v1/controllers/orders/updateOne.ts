import { NextFunction, Request, Response } from 'express';

import { updateOrder } from '../../../../services';

export default async function handler(req: Request, res: Response, next: NextFunction): Promise<void> {
  const models = req.app.get('models');
  const { orderId } = req.params;
  const { body } = req;

  try {
    const { 0: result } = await updateOrder(orderId, body, models);
    const message = result ? 'Order updated' : 'Order not found';
    res.json({ message });
  } catch (e) {
    next(e);
  }
}
