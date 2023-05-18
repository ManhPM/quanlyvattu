const express = require("express");
const { Account } = require("./models");
const { QueryTypes } = require("sequelize");
const { sequelize } = require("./models");
const { rootRouter } = require("./routers");
const cookieParser = require("cookie-parser");
const { authenticate } = require("./middlewares/auth/authenticate");
const path = require("path");
const port = 3005;
const app = express();
const cors = require("cors");
const multer = require("multer");

app.use(cookieParser());
app.use(cors());
//cài ứng dụng sử dụng json
app.use(express.json());
//cài static file
app.use("/static", express.static(path.join(__dirname, "public/image")));

app.use(
  express.urlencoded({
    extended: true,
  })
);

//dùng router
app.use(rootRouter);

//lắng nghe sự kiện kết nối
app.listen(port, async () => {
  console.log(`App listening on http://localhost:${port}`);
  try {
    await sequelize.authenticate();
    console.log("Kết nối thành công!.");
  } catch (error) {
    console.error("Kết nối thất bại:", error);
  }
});
