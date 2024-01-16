const fs = require('fs').promises;
const productManager = new ProductManager('./products.json');

class ProductManager {
  constructor(path) {
    this.path = path;
  }

  async addProduct(product) {
    const products = await this.getProducts();
    const newProduct = { id: products.length + 1, ...product };
    products.push(newProduct);
    await this.saveProducts(products);
    return newProduct;
  }

  async getProducts(limit) {
    const content = await fs.readFile(this.path, 'utf-8');
    const products = JSON.parse(content);
    return limit ? products.slice(0, limit) : products;
  }

  async getProductById(id) {
    const products = await this.getProducts();
    return products.find(product => product.id === id);
  }

  async updateProduct(id, updatedFields) {
    const products = await this.getProducts();
    const index = products.findIndex(product => product.id === id);
    if (index !== -1) {
      products[index] = { ...products[index], ...updatedFields };
      await this.saveProducts(products);
      return products[index];
    }
    return null;
  }

  async deleteProduct(id) {
    const products = await this.getProducts();
    const updatedProducts = products.filter(product => product.id !== id);
    await this.saveProducts(updatedProducts);
    return id;
  }

  async saveProducts(products) {
    await fs.writeFile(this.path, JSON.stringify(products, null, 2), 'utf-8');
  }
  
}

module.exports = ProductManager;