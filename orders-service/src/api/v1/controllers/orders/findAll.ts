import { NextFunction, Request, Response } from 'express';
import createError from 'http-errors';

import { findOrders } from '../../../../services';

export default async function handler(req: Request, res: Response, next: NextFunction): Promise<void> {
  const models = req.app.get('models');

  try {
    const orders = await findOrders(models);
    res.status(200).json({ orders });
  } catch (e: any) {
    next(createError(500, e.message));
  }
}
