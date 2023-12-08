import express from "express";
import ProductManager from "./Desafio 2/ProductManager.js";

const productManager = new ProductManager("./products.json");

const PORT = 8080;
const app = express();

app.listen(PORT, () => {
    console.log(`Servidor funcionando en puerto ${PORT}`);
});