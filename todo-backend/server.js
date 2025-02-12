const express = require("express");
const cors = require("cors");
const sequelize = require("./src/config/database");
const bodyParser = require("body-parser");
const authRoutes = require("./src/routes/auth");
const todoRoutes = require("./src/routes/todos");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());

app.use(bodyParser.json());

app.use("/auth", authRoutes);

app.use("/todos", todoRoutes);

sequelize
  .sync({ force: false })
  .then(() => console.log("Database synchronized"))
  .catch((err) => console.error("DB sync error:", err));

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
