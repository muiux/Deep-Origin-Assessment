import "dotenv/config";
const cors = require('cors');
import cookieParser from "cookie-parser";
import express from "express";
import connectToDatabase from "./config/db";
import { APP_ORIGIN, NODE_ENV, PORT } from "./constants/env";
import errorHandler from "./middleware/errorHandler";
import { OK } from "./constants/http";
import urlRoutes from "./routes/url.route";

const app = express();

// add middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: APP_ORIGIN,
    credentials: true,
  })
);
app.use(cookieParser());

app.get("/", (_, res) => {
  res.status(OK).json({
    status: "healthy",
  });
});

app.use("/url", urlRoutes);

// error handler
app.use(errorHandler);

app.listen(PORT, async () => {
  console.log(`Server listening on port ${PORT} in ${NODE_ENV} environment`);
  await connectToDatabase();
});
