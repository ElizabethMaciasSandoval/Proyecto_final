import { Router } from "express";
import { ProductManager } from "../clases/ProductManager.js";

export const productsController = Router();

const manager = new ProductManager('src/files/products.json')

productsController.get('/', async (req, res) => {
  const products = await manager.getProducts();
  const { limit } = req.query
  if(limit){
    const productsLimit = products.slice(0, Number(limit));
    return res.send(productsLimit)
  }else{
    return res.send(products)
  }
})

productsController.get('/:id', async (req, res) => {
  const { id } = req.params;
  const productById = await manager.getProductById(Number(id));
  res.send(productById);
})