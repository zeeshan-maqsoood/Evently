import { Sequelize } from "sequelize";
import { config } from "../config/globalenv.js"; // Make sure this path is correct
import User from "../model/user.js"; // Make sure this path is correct
import Events from "../model/event.js"; // Make sure this path is correct
import Chat from "../model/chat.js";
import Orders from "../model/order.js";
// Initialize Sequelize instance

const sequelize = new Sequelize(
  config.database_name,
  config.database_username,
  config.database_password,
  {
    host: config.database_host,
    dialect: config.database_dialect, // e.g., 'postgres', 'mysql', etc.
  }
);

// Initialize models
const UserModel = User(sequelize);
const EventModel = Events(sequelize);
const ChatModel = Chat(sequelize);
const OrderModel = Orders(sequelize);

// Define associations
UserModel.hasMany(EventModel, { foreignKey: "userId" }); // A User has many Events
EventModel.belongsTo(UserModel, { foreignKey: "userId" }); // An Event belongs to a User

EventModel.hasMany(ChatModel, { foreignKey: "eventId" }); // An Event has many Chats
ChatModel.belongsTo(EventModel, { foreignKey: "eventId" }); // A Chat belongs to an Event

EventModel.hasOne(OrderModel, { foreignKey: "eventId" });
OrderModel.belongsTo(EventModel, { foreignKey: "eventId" });

UserModel.hasMany(OrderModel, { foreignKey: "userId" });
OrderModel.belongsTo(UserModel, { foreignKey: "userId" });

UserModel.belongsTo(EventModel,{through : EventModel,foreignKey:"userId"})
EventModel.belongsTo(UserModel,{through:EventModel,foreignKey:"eventId"})


export { sequelize, UserModel, EventModel, ChatModel, OrderModel };
