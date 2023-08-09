import express from "express";
import cartsRouter from './routes/carts.router.js';
// import productsRouter from './routes/products.router.js';



const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('./public'));

app.use('/api/carts', cartsRouter);
// app.use('/api/products', productsRouter);


const server = app.listen(8080, () => console.log('Listening on port 8080'))