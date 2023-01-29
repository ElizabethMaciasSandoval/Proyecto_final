import { Router } from "express";
import { ProductManager } from "../clases/ProductManager.js";

export const productsController = Router();

const manager = new ProductManager('src/files/products.json');

productsController.get('/', async (req, res) => {
  const products = await manager.getProducts();
  const { limit } = req.query;
  if(limit){
    const productsLimit = products.slice(0, Number(limit));
    return res.json({message: productsLimit});
  }else{
    return res.json({message: products});
  }
})

productsController.get('/:id', async (req, res) => {
  const { id } = req.params;
  const productById = await manager.getProductById(Number(id));
  res.json({message: productById});
})

productsController.post('/', async (req, res) => {
  const {title, description, price, status, stock, category, thumbnails} = req.body;
  const product = {
    title,
    description,
    price,
    status,
    stock,
    category,
    thumbnails
  };
  await manager.addProduct(product);
  res.json({message: product});
})

productsController.put('/', async (req, res) => {
  const {id, title ,description, price, status, stock, category, thumbnails} = req.body;
  const product = {
    title,
    description,
    price,
    status,
    stock,
    category,
    thumbnails
  };
  await manager.updateProduct(id, product);
  res.json({message: product});
})

productsController.delete('/:id', async (req, res) => {
  const { id } = req.params;
  await manager.deleteProduct(Number(id));
  res.json({message: 'product removed successfully'});
})