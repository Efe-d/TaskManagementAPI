const express = require("express");
const cors = require("cors");

const authRouter = require("./Routers/authRouter");
const taskRouter = require("./Routers/taskRouter");
const tokenCheck = require("./middleware/tokenCheck.middleware");

const app = express();
app.use(
  cors({
    origin: "http://localhost:3000",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);

app.use(express.json());

app.use("/api/auth", authRouter);
app.use("/api/tasks", tokenCheck, taskRouter);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
