import { Router } from "express";

export const productsController = Router();

productsController.get('/', (req, res) => {
    res.json({message:'helou'})
})