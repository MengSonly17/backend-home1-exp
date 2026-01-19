const express = require('express');
const app = express();
const port = 3000;

app.use(express.json())

const products = [
    { id: 1, name: 'Coca', price: 0.5, qty: 19 },
    { id: 2, name: '7Ups', price: 0.5, qty: 19 },
    { id: 3, name: 'Pepsi', price: 0.5, qty: 19 },
];

// const products = [];

// get all products
app.get('/api/v1/products', (req, res) => {
    res.json({
        'messsage' : 'All products.',
        'data' : products,
        'status' : '200'
    });
});

// get products by id
app.get('/api/v1/products/:id',(req,res)=>{
    const id = req.params.id;
    const findProduct = products.find( item => item.id == id );

    res.json({
        'messsage' : 'Find.',
        'data' : findProduct,
        'status' : '200'
    });
});

// get products by name 
app.get('/api/v1/product',(req,res)=>{
    const {name} = req.query; 

    const findProduct = products.filter(item => item.name.toLowerCase() == name);

    res.json({
        'messsage' : 'Find by name.',
        'data' : findProduct,
        'status' : '200'
    });
});

// create product
app.post('/api/v1/products',(req,res)=>{
    const {name,price,qty} = req.body;
    let id = (products.length >= 1) ? (products.length + 1) : 1;

    let prod = {
        "id" : id,
        "name" : name,
        "price" : price,
        "qty" : qty
    }

    products.push(prod);

    res.json({
        'message' : 'Create Product was successfully.',
        'data' : products,
        'status' : '201'
    })
});

// update product
app.put('/api/v1/products/:id',(req,res)=>{
    const id = Number.parseInt(req.params.id);
    const {name,price,qty} = req.body;

    products.forEach( item => {
        if(item.id == id){
            item.name = name;
            item.price = price;
            item.qty = qty;
            return 0;
        }
    });

    res.json({
        'message' : 'Product was deleted.',
        'status' : '200',
        'data' : products
    });
});

// delete 
app.delete('/api/v1/products/:id',(req,res)=>{
    const id = Number.parseInt(req.params.id);
    let message = '';
    let status = '';

    const findIdx = products.findIndex(item => item.id == id);

    if(findIdx != -1){
        products.splice(findIdx,1)

        message = 'Delete Product was successfully.';
        status = '200';
    }
    else {
        message = 'Invalid id. Please try again.';
        status = '204';
    }
    

    res.json({
        'message' : message,
        'status' : status
    });
});





// run app 
app.listen(port, () => {
    console.log('Listening to port = ', port);
})