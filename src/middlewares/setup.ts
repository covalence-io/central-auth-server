import { Express } from "express";
import express from "express";
import cors from "cors";
import morgan from "morgan";
import helmet from "helmet";
import compression from "compression";
import indexRouter from "../routes";

export default function configure(app: Express) {
    app.use(cors());
    app.use(helmet());
    app.use(morgan("dev"));
    app.use(compression());

    app.use(express.json());
    app.use(indexRouter);
}
