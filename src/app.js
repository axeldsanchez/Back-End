import express from "express";
import ProductManager from "./Desafio 2/ProductManager.js";

const productManager = new ProductManager("./products.json");

const PORT = 8080;
const app = express();
app.use(express.urlencoded({extended: true}));

app.get("/products", async (req, res) => {
    const {limit} = req.query;
    const products = await productManager.getProducts();
    if (!limit) {
        return res.send(products);
    }
    const limitProducts = products.slice(0, limit);
    res.send(limitProducts);
}); 

app.get("/products/:id", async (req, res) => {
    const {id} = req.params;
    const products = await productManager.getProductsById(parseInt(id));
    res.send(products);
});


app.listen(PORT, () => {
    console.log(`Servidor funcionando en puerto ${PORT}`);
});