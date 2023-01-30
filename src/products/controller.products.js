import { Router } from "express";
import { ProductManager } from "../clases/ProductManager.js";

export const productsController = Router();

const manager = new ProductManager('src/files/products.json');

productsController.get('/', async (req, res) => {
  const products = await manager.getProducts();
  const { limit } = req.query;
  if(limit){
    const productsLimit = products.slice(0, Number(limit));
    return res.status(200).json({status:'successfully listed products',produsts: productsLimit});
  }else{
    return res.status(200).json({status:'successfully listed products',produsts: products});
  }
})

productsController.get('/:id', async (req, res) => {
  const { id } = req.params;
  const productById = await manager.getProductById(Number(id));
  if (!productById) {
    return res.status(404).json({status:`product with id ${id} not found`})
  }
  res.status(200).json({status:'products found successfully', product: productById});
})

productsController.post('/', async (req, res) => {
  const {title, description, price, status, stock, category, thumbnails} = req.body;
  if(!title|| !description || !price || !status || !stock || !category || !thumbnails){
    return res.status(406).json({status: 'cannot save product missing properties'})
  }else{
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
    return res.status(200).json({status:'products added successfully',product: product});
  }
})

productsController.put('/:id', async (req, res) => {
  const { id } = req.params;
  const {title ,description, price, status, stock, category, thumbnails} = req.body;
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
  res.status(200).json({status:'product updated successfully', product: product});
})

productsController.delete('/:id', async (req, res) => {
  const { id } = req.params;
  await manager.deleteProduct(Number(id));
  return res.status(200).json({status: 'product removed successfully'});
})