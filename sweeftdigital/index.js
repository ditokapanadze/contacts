const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const helmet = require("helmet");
const morgan = require("morgan");
var cors = require("cors");
const userRoute = require("./routes/users");
const authRoute = require("./routes/auth");
const contactSroute = require("./routes/contacts");
const errorHandler = require("./error/errorHandler");

app.use(cors());
app.use(express.json());
app.use(helmet());
app.use(morgan("common"));

dotenv.config();

// connect to mongo
mongoose.connect(process.env.MONGO_URL, { useNewUrlParser: true }, () => {
  console.log("Connected to MongoDB");
});

// request routes
app.use("/api/user", userRoute);
app.use("/api/auth", authRoute);
app.use("/api/contacts", contactSroute);

// error handling

// app.use((req, res, next) => {
//   const error = new Error("Not Found");
//   error.status = 404;
//   next(error);
// });

// app.use((error, req, res, next) => {
//   res.status(error.status || 500);
//   res.json({
//     error: {
//       message: error.message,
//     },
//   });
// });
app.use(errorHandler);
app.listen(8000, () => {
  console.log("server  running!");
});
