require("dotenv").config();
const express = require("express");
const sequelize = require("./db");
const models = require("./models/models");
const router = require("./routes/index");
const cors = require("cors");
const errorMiddleware = require("./middleware/ErrorHandlingMiddleware");

const PORT = process.env.PORT || 5000;

const app = express();
// настройка корс
app.use(cors());
app.use(express.json());
// обрабатываем ошибки, всегда послендний
app.use(errorMiddleware);

// все роутеры
app.use("/api", router);
const start = async () => {
  try {
    await sequelize.authenticate();
    await sequelize.sync();
    app.listen(PORT, () => console.log(`server started on port ${PORT}`));
  } catch (error) {
    console.log(error);
  }
};

start();
