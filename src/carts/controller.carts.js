import { Router } from "express";

export const cartsController = Router();

cartsController.get('/', (req, res) => {
    res.json({message:'holi'})
})