const sequelize = require("./src/config/database");
const User = require("./src/models/User");
const Todo = require("./src/models/Todo");

(async () => {
  try {
    console.log("Инициализация базы данных...");

    await sequelize.sync({ force: true });

    console.log("Таблицы успешно созданы!");

    const testUser = await User.create({
      username: "testuser",
      password: "testuser",
    });

    console.log(`Тестовый пользователь создан: ${testUser.username}`);

    process.exit(0);
  } catch (error) {
    console.error("Ошибка инициализации базы данных:", error);
    process.exit(1);
  }
})();
