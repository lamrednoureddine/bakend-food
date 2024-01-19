const productController = require("express").Router()
const Product = require("../models/Product")
// const user = require("../models/User")
const {verifyToken, verifyTokenAdmin} = require('../middlewares/verifyToken')

// get all restaurents products
productController.get('/', async (req, res) => {
    try {
      const products = await Product.find({});
      res.json(products);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Error fetching the products." });
    }
  });

// get all patesserie products
productController.get('/patisserie-products', async (req, res) => {
  try {
    const products = await Product.find({type : "sucre"});
    res.json(products);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching the products." });
  } 
});
// get one
productController.get('/:id', async (req, res) => {
  try {
     const productId = req.params.id;
     const product = await Product.findById(productId);
     
     if (!product) {
        // Send a 404 Not Found status with a message
        return res.status(404).json({ msg: "No product with the specified ID was found." });
     }
     
     // If the product is found, send it back with a 200 OK status.
     return res.status(200).json(product);
  } catch (error) {
     console.error(error);
     // Send a 500 Internal Server Error status with an error message.
     return res.status(500).json({ msg: "An error occurred while retrieving the product.", error: error.message });
  }
});

// create product
productController.post('/', async(req, res) => {
    try {
      const newProduct = await Product.create({...req.body});
        
      // Send a 201 Created status with the new product's data.
      return res.status(201).json(newProduct);
  } catch (error) {
      console.error(error);

      // Send a 500 Internal Server Error status with an error message.
      return res.status(500).json({
          msg: "There was a problem creating the product.",
          error: error.message
    });
  }
});
// delete a product 
productController.delete('/:id', async (req, res) => {
  try {
      const { id } = req.params;

      // Assuming there's a method to find and remove the product by ID.
      const deletedProduct = await Product.findByIdAndRemove(id);

      if (!deletedProduct) {
          // If no product is found with that ID, send a 404 Not Found status.
          return res.status(404).json({ msg: "Product not found." });
      }

      // Send a 200 OK status with a success message or the deleted product info.
      return res.status(200).json({
          msg: "Product successfully deleted.",
          product: deletedProduct
      });
  } catch (error) {
      console.error(error);

      // Send a 500 Internal Server Error status with an error message.
      return res.status(500).json({
          msg: "There was a problem deleting the product.",
          error: error.message
      });
  }
});

productController.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { type, title, desc, price, img, review, category, commander } = req.body;
    const updatedProduct = await Product.findByIdAndUpdate(
      id,
      { type, title, desc, price, img, review, category, commander },
      { new: true }
    );
    
    if (!updatedProduct) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.json(updatedProduct);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = productController