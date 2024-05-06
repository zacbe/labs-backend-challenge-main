import { NextFunction, Request, Response } from 'express';
import createError from 'http-errors';

import { handleOrderCreatedEvents as emmit } from '../../../../kafka/event-handlers';
import { insertOrder } from '../../../../services';

export default async function handler(req: Request, res: Response, next: NextFunction): Promise<void> {
  const models = req.app.get('models');
  const { body } = req;

  try {
    const order = await insertOrder(body, models);

    if (!order) return next(createError(400, 'Order could not be created'));

    await emmit({ orderid: order.id });
    res.status(201).json({ message: order });
  } catch (e: any) {
    console.error(`Error creating order: ${body}}:`, e.message);
    next(createError(500, e.message));
  }
}
