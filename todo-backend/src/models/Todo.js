const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");
const User = require("./User");

const Todo = sequelize.define("Todo", {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  title: { type: DataTypes.STRING, allowNull: false },
  completed: { type: DataTypes.BOOLEAN, defaultValue: false },
});

Todo.belongsTo(User);
User.hasMany(Todo);

module.exports = Todo;
