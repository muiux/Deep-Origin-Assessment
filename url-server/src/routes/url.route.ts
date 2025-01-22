import { Router } from "express";
import {
  createUrlHandler,
  redirectUrlHandler,
  getUrlListHandler,
  deleteUrlsHandler,
  updateUrlHandler,
} from "../controllers/url.controller";
import rateLimit from "express-rate-limit";
import { TOO_MANY_REQUESTS } from "../constants/http";

const rateLimiter = rateLimit({
  windowMs: 1 * 60 * 1000,
  max: 50,
  message: {
    error: {
      status: TOO_MANY_REQUESTS,
      title: "Too many requests",
      detail:
        "Too many requests from this IP. Please try again after a minute.",
    },
  },
});

const urlRoutes = Router();

urlRoutes.post("/shorten", rateLimiter, createUrlHandler);
urlRoutes.patch("/redirect/:slug", redirectUrlHandler);
urlRoutes.get("/getlist", rateLimiter, getUrlListHandler);
urlRoutes.patch("/update", rateLimiter, updateUrlHandler);
urlRoutes.delete("/delete", rateLimiter, deleteUrlsHandler);

export default urlRoutes;
