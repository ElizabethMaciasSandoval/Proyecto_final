import { Router } from "express";

export const productsRouter = Router();

productsRouter.get('/', (req, res) => {
    res.json({message:'helou'})
})