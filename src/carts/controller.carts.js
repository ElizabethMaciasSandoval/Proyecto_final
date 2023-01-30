import { Router } from "express";
import { CartManager } from "../clases/CartManager.js";

export const cartsController = Router();

const manager = new CartManager('src/files/carts.json');

cartsController.post('/', async (req, res) => {
  const newCart = await manager.addCart()
  res.status(200).json({status: 'cart created successfully', cart:newCart})
})

cartsController.get('/:cid', async (req, res) => {
  const { cid } = req.params;
  const products = await manager.getProductsByCartId(Number(cid));
  if(!products){
    return res.status(404).json({status:`cart with id ${cid} not found`})
  }
  res.status(200).json({status: `cart products with id: ${cid}`, products: products})
})

cartsController.post('/:cid/product/:pid', async (req, res) => {
  const { cid, pid } = req.params;
  const products = await manager.getProductsByCartId(Number(cid));
  if(!products){
    return res.status(404).json({status:`cart with id ${cid} not found`})
  }
  await manager.addProductByCartId(Number(cid), Number(pid))
  res.status(200).json({status: 'product added successfully'})
})