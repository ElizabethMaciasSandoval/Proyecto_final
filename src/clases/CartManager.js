import fs from 'fs';

export class CartManager {
  constructor(path){
    this.path = path
    // fs.writeFileSync(this.path, JSON.stringify([]));
  }

  async addCart(){
    try {
      let data = await fs.promises.readFile(this.path, 'utf-8');
      let cart;
      data = JSON.parse(data);
      if (data.length === 0) {
        cart = {
          cid: 1,
          products:[]
        }
      } else {
        const newId = data[data.length - 1].cid + 1;
        cart = {
          cid : newId,
          products:[]
        }
      }
      data.push(cart);
      await fs.promises.writeFile(this.path, JSON.stringify(data));
      return cart;
    } catch (error) {
      console.log(error);
    }
  }

  async getProductsByCartId (cid) {
    try {
      let data = await fs.promises.readFile(this.path, 'utf-8');
      data = JSON.parse(data);
      let cart = data.find(cart => cart.cid === cid);
      return cart.products;
    } catch (error) {
      console.log(error);
    }
  }

  async addProductByCartId (cid, pid) {
    try {
      let data = await fs.promises.readFile(this.path, 'utf-8');
      data = JSON.parse(data);
      const indexCart = data.findIndex(cart => cart.cid == cid);
      const cartProducts = data[indexCart].products;
      if (cartProducts.length === 0) {
        const product = {
          pid,
          quantity: 1
        }
        data[indexCart].products.push(product)
      }else{
        const pidExists = data[indexCart].products.find(product => product.pid === pid);
        if(pidExists === undefined){
          const newProduct = {
            pid,
            quantity: 1
          }
          data[indexCart].products.push(newProduct)
        }
        data[indexCart].products.forEach(product => {
          if (product.pid === pid) {
            product.quantity += 1
          }
        });
      }
      await fs.promises.writeFile(this.path, JSON.stringify(data));
    } catch (error) {
      console.log(error);
    }
  }
}