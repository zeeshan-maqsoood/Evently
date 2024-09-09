import { DataTypes, Model } from "sequelize";
import { v4 as uuid4 } from "uuid";

class Chat extends Model {}

export default (sequelize) => {
  Chat.init(
    {
      _id: {
        type: DataTypes.UUID,
        defaultValue: uuid4,
        primaryKey: true,
      },
      role: {
        type: DataTypes.STRING,
      },
      message: {
        type: DataTypes.STRING,
      },
      eventId: {
        type: DataTypes.UUID,
        references: {
          model: "events",
          key: "_id",
        },
      },
    },
    {
      sequelize,
      modelName: "Chat",
      tableName: "chat",
    }
  );

  return Chat;
};
