const express = require('express'); 
const morgan = require('morgan');
const bodyParser = require('body-parser')
const app = express(); 

const productRoutes = require('./api/routes/products');
const ordersRoutes = require('./api/routes/orders')

app.use(morgan('dev'))
app.use(bodyParser.urlencoded({extended: false})); 
app.use(bodyParser.json());

app.use('/products', productRoutes);
app.use('/orders', ordersRoutes);

app.use((req, res, next) => {
    const error = new Error('Not found');
    error.status = 404 ;
    next(error)
})
app.use((error, req, res, next) => {
    res.status(error.status || 500); 
    res.json({
        error:{
            message: error.message
        }
    })
})
module.exports = app;