import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import db from "./config/Database.js";
import router from "./routes/index.js";
import Services_API from "./routes/ORM/Services_API.js";
import Users_API from "./routes/ORM/Users_API.js";
import Customerportal_Api from "./routes/ORM/Customerportal_Api.js";
import bodyParser from "body-parser";

dotenv.config();
const app = express();

app.use(cors({ credentials: true, origin: "http://localhost:3000" }));
app.use(cookieParser());
app.use(express.json());
app.use(bodyParser.json());

app.use(router); //API for User Registration & Login
app.use("/services", Services_API); // API for Services Name
app.use("/Users", Users_API); // API for read,update,delete the users data
app.use("/Customer", Customerportal_Api);
const port = process.env.PORT; // Fallback to 3000 for local development

db.sync()
  .then(() => {
    app.listen(port, () => {
      console.log(`Server running on port ${port}`);
    });
  })
  .catch((err) => {
    console.error("Unable to connect to the database:", err);
  });
