import { Sequelize } from 'sequelize';

import { initOrder } from './order';
import { initUser } from './user';

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: './database.sqlite3',
  logging: false,
  define: {
    freezeTableName: true,
    timestamps: false,
  },
});

const User = initUser(sequelize);
const Order = initOrder(sequelize);

User.hasMany(Order);
Order.belongsTo(User);

export { Order, sequelize, User };
