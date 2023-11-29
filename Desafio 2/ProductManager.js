const fs = require('fs');

class ProductManager {
    constructor(path) {
        this.path = path;
    }

    static id = 0;

    async addProduct(product) {
        if (!product.title || !product.description || !product.price || !product.thumnail || !product.code || !product.stock) {
            console.error("Todos los campos son obligatorios.")
            return console.error("Producto incompleto");
        }

        ProductManager.id++;
         
        const products = await this.getProducts();
        const newProduct = {
            id: ProductManager.id,
            title: product.title,
            description: product.description,
            code: product.code,
            stock: product.stock,
            thumnail: product.thumnail,
            price: product.price
        }
        products.push(newProduct);

        await fs.promises.writeFile(this.path, JSON.stringify(products), 'utf-8');
    }

    async getProducts() {

        try {
            const data = await fs.promises.readFile(this.path, 'utf-8');
            const products = JSON.parse(data);
            return products;
        } catch (error) {
            return [];
        }
    }

    async getProductsById(){
        const products = await this.getProducts();
        const product = products.find(p => p.id === id);
        if(!product){
            return console.error("Producto no encontrado");
        }
        return product;
    }
}