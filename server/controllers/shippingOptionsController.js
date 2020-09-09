const mongoose = require('mongoose');
const ShippingOption = require('../models/ShippingOption');

exports.getItems = async (req, res) => {
  await ShippingOption.find({}, (err, items) => {
    if (err) {
      return res.status(400).json({ success: false, error: err })
    }
    if (!items.length) {
      return res
        .status(404)
        .json({ success: false, error: `No items found` })
    }
    return res.status(200).json({ success: true, data: items })
  }).catch(err => console.log(err))
};

exports.addItem = async (req, res) => {
  const body = req.body;

  if (!body) {
    return res.status(400).json({
      success: false,
      error: 'You must provide a item',
    });
  }

  const item = new ShippingOption(body);

  if (!item) {
    return res.status(400).json({ success: false, error: "item not found" });
  }

  await item.save();
    
  return res.status(201).json({
    success: true,
    id: item._id,
    item: 'Item created!',
  });
};

exports.updateItem = async (req, res) => {
  const body = req.body;

  if (!body) {
    return res.status(400).json({
      success: false,
      error: 'You must provide a item',
    });
  }

  const item = await ShippingOption.findOneAndUpdate({ id: req.body.id }, req.body, {
    new: true,
    runValidators: true
  }).exec();

  if (!item) {
    return res.status(400).json({ success: false, error: "item not found" });
  }

  await item.save();
    
  return res.status(201).json({
    success: true,
    id: item._id,
    item: 'Item updated!',
  });
};