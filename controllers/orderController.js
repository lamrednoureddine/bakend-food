const orderController = require("express").Router();
const Order = require('../models/Order');
const {verifyToken, verifyTokenAdmin} = require('../middlewares/verifyToken')
// Get tous les commandes
orderController.get('/', async (req, res) => {
    try {
        const orders = await Order.find({})
          .populate({
            path: "userId",
            select: "nom prenom email tel"
          })
          .populate({
            path: "items.productId",
            select: "title price" // Assuming you want title and price of each product
          });
        res.json(orders);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Error fetching the products." });
    }
  });

  // POST a new order
orderController.post('/', verifyToken, async (req, res) => {
    try {
      const newOrder = await Order.create({ ...req.body });
  
      // Send a 201 Created status with the new order's data.
      return res.status(201).json(newOrder);
    } catch (error) {
      console.error(error);
  
      // Send a 500 Internal Server Error status with an error message.
      return res.status(500).json({
        msg: "There was a problem creating the order.",
        error: error.message
      });
    }
  });

  module.exports = orderController;
  