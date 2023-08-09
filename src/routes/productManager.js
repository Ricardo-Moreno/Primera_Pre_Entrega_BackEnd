import fs from "fs";



export default class ProductManager {
    constructor(path) {
        this.path = path;
        this.productos = [];
    }

    async loadProducts() {
        try {
            const data = await fs.promises.readFile(this.path, 'utf-8');
            this.productos = JSON.parse(data);
        } catch (error) {
            console.log('Error al cargar los productos:', error);
        }
    }

    async saveProducts() {
        try {
            await fs.promises.writeFile(this.path, JSON.stringify(this.productos, null, 2), 'utf-8');
            console.log('Productos guardados correctamente.');
        } catch (error) {
            console.log('Error al guardar los productos:', error);
        }
    }

    getId() {
        return this.productos.length + 1;
    }

    async addProduct({ title, description, price, thumbnail, code, stock }) {
        if (!title || !description || !price || !thumbnail || !code || !stock) {
            console.log('Hay campos vacíos');
            return;
        }

        if (this.productos.some((product) => product.code === code)) {
            console.log('Un elemento con este código ya existe');
            console.log(`Este es el producto que tiene el código repetido: ${title}`);
            return;
        }

        const id = this.getId();
        const product = { id, title, description, price, thumbnail, code, stock };
        this.productos.push(product);
        await this.saveProducts();
    }

    async getProducts() {
        await this.loadProducts();
        return this.productos;
    }

    async getProductById(id) {
        await this.loadProducts();
        const product = this.productos.find((product) => product.id === id);
        if (product) {
            return product;
        }
        console.log(`El producto con el ID ${id} no existe`);
    }

    async updateProduct(id, updatedFields) {
        await this.loadProducts();
        const productIndex = this.productos.findIndex((product) => product.id === id);
        if (productIndex !== -1) {
            this.productos[productIndex] = { ...this.productos[productIndex], ...updatedFields };
            await this.saveProducts();
            console.log(`Producto con ID ${id} actualizado correctamente.`);
        } else {
            console.log(`El producto con el ID ${id} no existe`);
        }
    }

    async deleteProduct(id) {
        await this.loadProducts();
        const productIndex = this.productos.findIndex((product) => product.id === id);
        if (productIndex !== -1) {
            this.productos.splice(productIndex, 1);
            await this.saveProducts();
            console.log(`Producto con ID ${id} eliminado correctamente.`);
        } else {
            console.log(`El producto con el ID ${id} no existe`);
        }
    }
    async getProductByLimit(limit) {
        await this.loadProducts();
        return limit ? this.productos.slice(0, limit) : this.productos;
    }

}
