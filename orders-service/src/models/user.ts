import { CreationOptional, DataTypes, InferAttributes, InferCreationAttributes, Model, Sequelize } from 'sequelize';

export class User extends Model<InferAttributes<User>, InferCreationAttributes<User>> {
  declare id: CreationOptional<number>;
  declare firstName: string;
  declare lastName: string;
  declare houseNumber: string;
  declare streetAddress: string;
  declare city: string;
  declare county: string;
  declare zip: string;
  declare synced: boolean;
  declare extensionFields: string;
}

export function initUser(sequelize: Sequelize): typeof User {
  User.init(
    {
      id: {
        type: DataTypes.STRING,
        primaryKey: true,
      },
      firstName: {
        type: DataTypes.TEXT,
      },
      lastName: {
        type: DataTypes.TEXT,
      },
      houseNumber: {
        type: DataTypes.TEXT,
      },
      streetAddress: {
        type: DataTypes.TEXT,
      },
      city: {
        type: DataTypes.TEXT,
      },
      county: {
        type: DataTypes.TEXT,
      },
      zip: {
        type: DataTypes.TEXT,
      },
      synced: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      extensionFields: {
        type: DataTypes.TEXT,
        get: function () {
          const value = this.getDataValue('extensionFields');
          const parsedValue = JSON.parse(value);
          return parsedValue;
        },
        set: function (value) {
          const parsedValue = JSON.stringify(value);
          this.setDataValue('extensionFields', parsedValue);
        },
      },
    },
    {
      sequelize,
      modelName: 'User',
    }
  );

  return User;
}
