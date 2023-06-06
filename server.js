const express = require('express')
const mongoose = require('mongoose')
const uri = require('./Uri')
const Product = require('./models/productModel')
const app = express()


app.use(express.json())

//routes
app.get('/',(req,res)=>{
    res.send('Hello Node api')
})

//fetch product
app.get('./products',async(req,res)=>{
    try {
        const products = await Product.find({});
        res.status(200).json(products)
    } catch (error) {
        res.status(500).json({message:error.message})
    }
})

//update product
app.put('./products/:id',async(req,res)=>{
    try {
        const {id} = req.params;
        const product = await Product.findByIdAndUpdate(id,req.body)

        if(!product){
            return res.status.apply(400).json({message: `cannot find any product with ID ${id}`})
        }
        res.status(200).json(product)
    } catch (error) {
        return res.status(500).json({message:error.message})
    }
})

//delete a product
app.delete('./products/:id',async(req,res)=>{
    try {
        const {id} = req.params;
        const product = await Product.findByIdAndDelete(id)

        if(!product){
            return res.status.apply(404).json({message: `cannot find any product with ID ${id}`})
        }
        res.status(200).json(product)
    } catch (error) {
        return res.status(500).json({message:error.message})
    }
})



//post product
app.post('/product',async(req,res)=>{
    try{
        const product = await Product.create(req.body)
        res.status(200).json(product)
    }catch(err){
        console.log(err.message);
        res.status(500).json({message:err.message})
    }
})


//mongodbconnection string

const uriString = uri;
//"mongodb+srv://admin:6R68ylNszqVqvSOK@cluster0.pszym.mongodb.net/?retryWrites=true&w=majority";

mongoose.connect(uriString)
.then(()=>{
    console.log('mongo connected')
    app.listen(3000, ()=>{
        console.log("Api is running on port 3000")
    })
  
}).catch((err)=>{console.log(err)})

