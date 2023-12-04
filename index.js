const express = require("express");
const { config } = require("dotenv");
const mongoose = require("mongoose");
config();
const cors = require("cors");

const app = express();
const userRouter = require("./router/users");
const departmentRouter = require("./router/departments");
const employeeRouter = require("./router/employees");

app.use(express.static("public"));
app.use(express.json());
app.use(cors());

//routes
app.use(userRouter);
app.use(departmentRouter);
app.use(employeeRouter);

const main = async () => {
  try {
    await mongoose.connect(process.env.DB_URI, {
      useNewURLParser: true,
      useUnifiedTopology: true,
    });
    app.listen(process.env.PORT, () =>
      console.log(`Server started listening on PORT ${process.env.PORT}`)
    );
  } catch (err) {
    console.log(err);
  }
};

main();
