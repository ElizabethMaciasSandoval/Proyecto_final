import { Router } from "express";
import { CartManager } from "../clases/CartManager.js";

export const cartsController = Router();

const manager = new CartManager('src/files/carts.json');

cartsController.post('/', async (req, res) => {
  const newCart = await manager.addCart()
  res.json({message: newCart})
})

cartsController.get('/:cid', async (req, res) => {
  const { cid } = req.params;
  const products = await manager.getProductsByCartId(Number(cid));
  res.json({message: products})
})

cartsController.post('/:cid/product/:pid', async (req, res) => {
  const { cid, pid } = req.params;
  await manager.addProductByCartId(Number(cid), Number(pid))
  res.json({message: 'product added successfully'})
})