const express = require('express');
const app = express();

const morgan = require('morgan');
const errorHandler = require("./src/middlewares/errorHandler.middleware")

const tasksRouter = require("./src/routes/tasks.routes");
const authRouter = require("./src/routes/auth.routes");

app.use(morgan('dev'));
app.use(express.json());

app.use("/api", tasksRouter);
app.use("/api", authRouter);

app.use(errorHandler);

module.exports = app;