import express  from "express";
import { routes } from "./router/router.js";
export const app = express();
app.use(express.json())

routes(app)