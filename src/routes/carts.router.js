import ProductManager from './productManager.js';
import { Router } from 'express'

const router = Router();
const productManager = new ProductManager('routes/productos.json');


router.get('/', async (req, res) => {
    let { limit } = req.query
    const productList = await productManager.getProductByLimit(limit)
    res.send(productList)
})

router.post('/products', async (req, res) => {
    try {
        const newUser = req.body
        await productManager.addProduct(newUser)
        res.status(201).send('New user added!')
    } catch (error) {
        console.log(error)
    }
})

router.put('/products/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const dataToUpdate = req.body;
        await productManager.updateProduct(id, dataToUpdate)
        res.send('new up date product')
    } catch (error) {
        console.error("Hubo un error")
    }
})



export default router;