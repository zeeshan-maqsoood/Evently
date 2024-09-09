// src/loaders/expressLoader.js
import express from "express";
import cors from "cors";
import morgan from "morgan";
import bodyParser from "body-parser";
import routes from "../routes/index.js";

export default (app) => {
  process.on("uncaughtException", async (error) => {
    console.log("uncaughtException::", error);
  });

  process.on("unhandledRejection", async (error) => {
    console.log("unhandledRejection::", error);
  });

  app.enable("trust proxy");
  app.use(cors());
  app.use(
    bodyParser.urlencoded({
      parameterLimit: 100000,
      limit: "50mb",
      extended: false,
    })
  );
  app.use(bodyParser.json());
  // app.use(morgan("dev"));
  app.use(express.static("public"));
  app.disable("x-powered-by");
  app.disable("etag");

  app.use("/api", routes);
};
