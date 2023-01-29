import fs from 'fs';
import { v4 as code } from 'uuid';

export class ProductManager {
  constructor(path){
    this.path = path;
    // fs.writeFileSync(this.path, JSON.stringify([]));
  }

  async addProduct(product){
    try {
      let data = await fs.promises.readFile(this.path, 'utf-8');
      data = JSON.parse(data);
      if (data.length === 0) {
        product.id = 1;
        product.code = code();
      } else {
        const newId = data[data.length - 1].id + 1;
        product.id = newId;
        product.code = code();
      }
      data.push(product);
      await fs.promises.writeFile(this.path, JSON.stringify(data));
    } catch (error) {
      console.log(error);
    }
  }

  async getProducts(){
    try {
      let data = await fs.promises.readFile(this.path, 'utf-8');
      data = JSON.parse(data);
      return data;
    } catch (error) {
      console.log(error);
    }
  }

  async getProductById(idProduct){
    try {
      let data = await fs.promises.readFile(this.path, 'utf-8');
      data = JSON.parse(data);
      data = data.find(element => element.id === idProduct);
      return data;
    } catch (error) {
      console.log(error);
    }
  }

  async updateProduct(id, product){
    try {
      let data = await fs.promises.readFile(this.path, 'utf-8');
      data = JSON.parse(data);
      const index = data.findIndex(product => product.id === id);
      data[index] = {
        ...data[index],
        ...product
      }
      await fs.promises.writeFile(this.path, JSON.stringify(data));
    } catch (error) {
      console.log(error);
    }
  }

  async deleteProduct(id){
    try {
      let data = await fs.promises.readFile(this.path, 'utf-8');
      data = JSON.parse(data);
      data = data.filter(element => element.id != id);
      await fs.promises.writeFile(this.path, JSON.stringify(data))
    } catch (error) {
      console.log(error);
    }
  }
}
