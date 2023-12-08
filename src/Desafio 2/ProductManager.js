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

    async getProductsById(id) {
        const products = await this.getProducts();
        const product = products.find(p => p.id === id);
        if (!product) {
            return console.error("Producto no encontrado");
        }
        return product;
    }

    async deleteProduct(id) {
        const products = await this.getProducts();
        const productsDeleted = products.filter(product => product.id !== id);
        await fs.promises.writeFile(this.path, JSON.stringify(productsDeleted), 'utf-8')
    }

    async updateProduct(id, productToUpdate) {
        const products = await this.getProducts();
        const updateProducts = products.map(product => {
            if (product.id === id) {
                return {
                    ...product,
                    ...productToUpdate,
                    id
                }

            }

            return product;
        });

        await fs.promises.writeFile(this.path, JSON.stringify(updateProducts), 'utf-8')
    }
}

const test = async () => {
    const productManager = new ProductManager('./products.json');
/*     await productManager.addProduct({
        title: "Celular",
        description: "S22",
        code: 2200,
        stock: 5,
        thumnail: "./S22.jpg",
        price: 150000,

    });

    await productManager.addProduct({
        title: "Celular",
        description: "S23",
        code: 2300,
        stock: 8,
        thumnail: "./S23.jpg",
        price: 180000,

    });

    await productManager.addProduct({
        title: "Celular",
        description: "S24",
        code: 2400,
        stock: 10,
        thumnail: "./S24.jpg",
        price: 200000,

    }); */

    const product2 = await productManager.getProductsById(2);
    console.log(product2);

    await productManager.updateProduct(1, {
        title: "Xiaomi"
    });

    await productManager.deleteProduct(3);

}


test ();

