import { DataTypes, Model, STRING } from "sequelize";
import { v4 as uuid4 } from "uuid";

export default (sequelize) => {
  class Events extends Model {}

  Events.init(
    {
      _id: {
        type: DataTypes.UUID,
        defaultValue: uuid4,
        primaryKey: true,
      },
      eventName: {
        type: DataTypes.STRING,
      },
      eventDescription: {
        type: DataTypes.STRING,
      },
      eventDate: {
        type: DataTypes.DATE,
      },
      location: {
        type: DataTypes.STRING,
      },
      approved: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      status: {
        type: DataTypes.STRING,
        defaultValue: "pending",
      },
      publishStatus: {
        type: STRING,
      },
      customerId: {
        type: STRING,
      },
      invitedIds: {
        type: DataTypes.ARRAY(DataTypes.STRING),
      },
      userId: {
        type: DataTypes.INTEGER,
        references: {
          model: "users",
          key: "_id",
        },
      },
    },
    {
      sequelize,
      modelName: "Events",
      tableName: "events",
    }
  );

  return Events;
};
