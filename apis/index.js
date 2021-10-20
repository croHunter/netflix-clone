const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const authRoute = require("./routes/auth");
const userRoute = require("./routes/users");
const movieRoute = require("./routes/movies");
const listRoute = require("./routes/lists");
dotenv.config();
const app = express();

//DB_CONNECTION
mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: true,
  })
  .then(() => console.log(`connection to database established`))
  .catch((err) => {
    console.log(`db error ${err.message}`);
    process.exit(1);
  });

//Use express middleware
app.use(express.json()); // to support JSON-encoded bodies
app.use(express.urlencoded({ extended: true })); // to support URL-encoded bodies
app.use(cookieParser()); // for easier cookie handling
app.use(cors({ origin: "http://localhost:4000", credentials: true }));
//ROUTES
app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);
app.use("/api/lists", listRoute);
app.use("/api/movies", movieRoute);

//EXIT
const gracefulExit = () => {
  mongoose.connection.close(() => {
    console.log(
      "Mongoose default connection with DB. Db server is disconnected through app termination"
    );
    process.exit(0);
  });
};

// If the Node process ends, close the Mongoose connection
process.on("SIGINT", gracefulExit).on("SIGTERM", gracefulExit);

let port = process.env.PORT;
if (port == null || port == "") {
  port = 8000;
}
app.listen(port, () => console.log("Listening to port 8000..."));
