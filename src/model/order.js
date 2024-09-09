import { DataTypes, Model } from "sequelize";
import { v4 as uuid4 } from "uuid";

class Orders extends Model {}

export default (sequelize) => {
  Orders.init(
    {
      _id: {
        type: DataTypes.UUID,
        defaultValue: uuid4,
        primaryKey: true,
      },
      eventId: {
        type: DataTypes.UUID, // Ensure this matches the type of the primary key in the Events model
        references: {
          model: "events",
          key: "_id",
        },
      },
      userId: {
        type: DataTypes.INTEGER, // Ensure this matches the type of the primary key in the User model
        references: {
          model: "users",
          key: "_id",
        },
      },
      amount: {
        type: DataTypes.STRING,
      },
      currency: {
        type: DataTypes.STRING,
      },
      status: {
        type: DataTypes.STRING,
        defaultValue: "PENDING",
      },

      paymentIntend_id: {
        type: DataTypes.STRING,
        allowNull: true,
      },
    },
    {
      sequelize,
      modelName: "Orders",
      tableName: "orders",
    }
  );

  return Orders;
};
