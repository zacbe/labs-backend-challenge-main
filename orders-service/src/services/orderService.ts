import { getContacts } from '../libs';

interface OrderInput {
  userId: string;
  description: string;
}

interface Models {
  Order: any;
  User: any;
}

async function insertOrder(body: OrderInput, models: Models): Promise<typeof Order | null> {
  const { Order, User } = models;
  const { userId, description } = body;

  try {
    const user = await User.findByPk(userId);

    if (!user) {
      const contacts = await getContacts(userId);
      if (contacts) {
        await User.create({ ...contacts, synced: true });
      } else {
        console.error(`User ${userId} could not be created`);
        return null;
      }
    }

    const order = await Order.create({ description });
    await order.setUser(userId);
    return order.toJSON();
  } catch (error: any) {
    console.error(`Error creating order: ${error.message}`);
    throw error;
  }
}

async function findOrders(models: Models): Promise<Array<typeof Order>> {
  const { Order, User } = models;
  const orders = await Order.findAll({
    attributes: ['id', 'description'],
    include: {
      model: User,
      attribures: [
        'firstName',
        'lastName',
        'houseNumber',
        'streetAddress',
        'city',
        'zip',
        'country',
        'synced',
        'extensionFields',
      ],
    },
  });
  return orders.map((order: typeof Order) => order.toJSON());
}

async function findOrderById(id: string, models: Models): Promise<typeof Order | null> {
  const { Order, User } = models;
  const order = await Order.findByPk(id, {
    attributes: ['id', 'description'],
    include: [
      {
        model: User,
        attribures: [
          'firstName',
          'lastName',
          'houseNumber',
          'streetAddress',
          'city',
          'zip',
          'country',
          'synced',
          'extensionFields',
        ],
      },
    ],
  });
  return order ? order.toJSON() : null;
}

async function deleteOrder(id: string, models: Models): Promise<number> {
  const { Order } = models;
  return Order.destroy({ where: { id } });
}

async function updateOrder(id: string, body: Order, models: Models): Promise<Array<number>> {
  const { Order } = models;
  const { description } = body;
  return Order.update({ description }, { where: { id } });
}

export { deleteOrder, findOrderById, findOrders, insertOrder, updateOrder };
