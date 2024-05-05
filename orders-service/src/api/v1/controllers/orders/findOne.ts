import { NextFunction, Request, Response } from 'express';
import createError from 'http-errors';

import { findOrderById } from '../../../../services';

export default async function handler(req: Request, res: Response, next: NextFunction): Promise<void> {
  const orderId = req.params.orderId;
  const models = req.app.get('models');

  try {
    const order = await findOrderById(orderId, models);
    if (!order) {
      return next(createError(404, 'Order not found'));
    }
    res.json({ order });
  } catch (e) {
    next(e);
  }
}
