const express = require('express'); 
const router = express.Router();
const mongoose = require('mongoose'); 
const multer = require('multer');

const storage = multer.diskStorage({ //using multer to add files
    destination: function(req, file, cb){
        cb(null, './uploads/')    
    },
    filename: function(req, file, cb){
        const now = new Date().toISOString(); const date = now.replace(/:/g,'-');  cb(null, date+file.originalname);    
    }
})

const fileFilter = (req, file, cb) => {
    //reject file
    if (file.mimetype === 'image/jgp' || file.mimetype === 'image/png'){
        cb(null, true);
    } else {
        cb(null, false); 
    }
}

const upload = multer(
{
    storage: storage,
    limits: {fileSize: 1024 * 1024 * 5},
    fileFilter: fileFilter
}); 
const Product = require('../models/product');


router.get('/', (req, res, next) => {
    Product.find()
    .select('name price _id productImage')
    .exec()
    .then(docs => {
        const response = {
            count: docs.length,
            products: docs.map(doc => {
                return {
                    name: doc.name, 
                    price: doc.price, 
                    _id: doc._id,
                    productImage: doc.productImage,
                    request: {
                        type: 'GET', 
                        url: 'http://localhost:3000/products/'+doc._id 
                    }
                }
            })
        }; 
            res.status(200).json(response);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({
            error: err
        })
    })
});
router.post('/', upload.single('productImage'), (req, res, next) => {
    console.log(req.file);
    const product = new Product({
        _id: new mongoose.Types.ObjectId(),
        name: req.body.name,
        price: req.body.price,
        productImage: req.file.path
    });
    product.save()
    .then(result => {
        console.log(result);
        res.status(201).json({
            message: 'Product created successfully ',
            createProduct: {
                name: result.name,
                price: result.price,
                _id: result._id,
                request: {
                    type: 'GET', 
                    url: 'http://localhost:3000/products/'+result._id 
                }
            } 
        });
    })
    .catch(err =>
         console.log(err));
         res.status(500).json({
            error: err,
    });
});

router.get('/:productId', (req, res, next) => {
    const id = req.params.productId;
    Product.findById(id)
    .select('name price _id productImage')
    .exec()
    .then(doc => {
        console.log("From database",doc);
        if (doc){
            res.status(200).json({
                product: doc,
                request: {
                    type: 'GET', 
                    url: 'http://localhost:3000/products'
                }
            });
        } else{
            res.status(404).json({message: 'No valid ID'})
        }
    })
    .catch(err =>{
        console.log(err);
        res.status(500).json({
            error: err
        }) 
    })
    
})
router.patch('/:productId', (req, res, next) => {
    const id = req.params.productId;  // id para o update
    const updateOps = {}; 
        for(const ops of req.body){
            updateOps[ops.propName] = ops.value;
        }
    Product.update({ _id: id }, {$set: updateOps })
    .exec()
    .then(result => {
        console.log(result);
        res.status(200).json({
            message: 'Product Update',
            request: {
                type: 'GET',
                url: 'http://localhost:3000/products/' + id
            }
        })
    })
    .catch(err => {
        console.log(err)
        res.status(500).json({
            error: err
        })
    })
    ;
})



module.exports = router;