import { Router } from "express";

export const cartsRouter = Router();

cartsRouter.get('/', (req, res) => {
    res.json({message:'holi'})
})