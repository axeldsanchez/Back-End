class ProductManager {
    constructor() {
        this.products = [];
    }

    static id = 0;

    addProducts(title, description, price, thumnail, code, stock) {
        ProductManager.id++;
        const product = {
            id: ProductManager.id,
            title,
            description,
            price,
            thumnail,
            code,
            stock
        }
        if (!product.title || !product.description || !product.price || !product.thumnail || !product.code || !product.stock) {
            console.error("Todos los campos deben ser completados.")
            return;
        }
        if (this.products.find(p => p.code === code)) {
            console.error('Ya existe un producto con el mismo código.');
            return;
        }
        this.products.push(product);
    }

    getProducts() {
        console.log(this.products);
        return this.products;
    }

    getProductById(id) {
        const productoBuscado = this.products.find(p => p.id === id);
        if (productoBuscado) {
            console.log("Producto encontrado", productoBuscado);
        } else {
            console.error("Not found");
        }
    }
}

const newProduct = new ProductManager();

newProduct.addProducts("Camisa", "Camisa Blanca", 15000, "https://equus.vtexassets.com/arquivos/ids/220799-500-auto?v=637654278856870000&width=500&height=auto&aspect=true", "C1", 50);
newProduct.addProducts("Jean", "Jean Azul", 16000, "https://acdn.mitiendanube.com/stores/002/580/475/products/tienda-nube-dimension-fotos-381-19739d513f2e681d6f16862417731487-480-0.webp", "J1", 25);
newProduct.getProducts();
newProduct.getProductById(1);