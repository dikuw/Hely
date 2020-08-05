const mongoose = require('mongoose');
const Order = require('../models/Order');

exports.getOrders = async (req, res) => {
  const orders = await Order.find();
  if (!devices.length) {
    return res.status(400).json({ success: false, error: "No orders found" });
  } else {
    return res.status(200).json({ success: true, data: orders })
  }
};

exports.getUserOrders = async (req, res) => {
  const orders = await Order.find({ "user.id" : req.params.id });
  if (!orders.length) {
    return res.status(200).json({ success: false, error: "No orders found" });
  } else {
    return res.status(200).json({ success: true, data: orders })
  }
};

exports.postOrder = async (req, res) => {
  const body = req.body;
  const order = new Order(body);

  if (!order) {
    return res.status(400).json({ success: false, error: err });
  }

  await order.save();
    
  return res.status(201).json({
    success: true,
    id: order._id,
    order: 'Order created!',
  });
};

exports.putOrder = async (req, res) => {
  const body = req.body;
  Object.values(body).forEach(async (item) => {
    delete order._id;
    await new Order(order).save();
  })
  return res.send(body);
};