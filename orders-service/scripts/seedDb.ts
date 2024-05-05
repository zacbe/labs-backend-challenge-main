import { Order, sequelize, User } from '../src/models';

/* WARNING THIS WILL DROP THE CURRENT DATABASE */
seed();

async function seed() {
  // create tables
  // await sequelize.query('PRAGMA foreign_keys = false;');
  await User.sync({ force: true });
  await Order.sync({ force: true });
  // await sequelize.query('PRAGMA foreign_keys = true;');

  // insert data
  await Promise.all([
    User.create({
      id: '662fd536ea8c270e6fdadf64',
      firstName: 'Antione',
      lastName: 'Funk',
      streetAddress: 'Lebsack View',
      houseNumber: '106',
      zip: '25216-7256',
      city: 'South Alexisville',
      country: 'Burundi',
      synced: true,
      extensionFields: {
        email: 'antione.funk@example.com'
      }
    }),
    User.create({
      id: '662fd536ea8c270e6fdadf65',
      firstName: 'Valentin',
      lastName: 'Graham',
      streetAddress: 'McGlynn Lodge',
      houseNumber: '508',
      zip: '55643-9541',
      city: 'Binsbury',
      country: 'Chile',
      synced: true,
      extensionFields: {
        email: 'valentin.graham@example.com'
      }
    }),
    Order.create({ id: 1, description: 'Order 1', UserId: '662fd536ea8c270e6fdadf64' }),
    Order.create({ id: 2, description: 'Order 2', UserId: '662fd536ea8c270e6fdadf65' }),
    Order.create({ id: 3, description: 'Order 3', UserId: '662fd536ea8c270e6fdadf64' }),
    Order.create({ id: 4, description: 'Order 4', UserId: '662fd536ea8c270e6fdadf65' }),
  ]).then(() => {
    console.log('Database seeded 🌱');
  });
}
