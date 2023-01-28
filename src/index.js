import express  from "express";
import { productsRouter } from "./routes/products.routes.js";
import { cartsRouter } from "./routes/carts.routes.js";
export const app = express();
app.use(express.json())

app.use('/products', productsRouter)
app.use('/carts', cartsRouter)