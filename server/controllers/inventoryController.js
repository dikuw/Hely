const mongoose = require('mongoose');
const Item = require('../models/Item');
const jimp = require('jimp');
const cloudinary = require('cloudinary').v2;

cloudinary.config({ 
  cloud_name: process.env.CLOUD_NAME, 
  api_key: process.env.CLOUD_API_KEY, 
  api_secret: process.env.CLOUD_API_SECRET
});

exports.getInventory = async (req, res) => {
  await Item.find({}, (err, inventory) => {
    if (err) {
      return res.status(400).json({ success: false, error: err })
    }
    if (!inventory.length) {
      return res
        .status(404)
        .json({ success: false, error: `No inventory found` })
    }
    return res.status(200).json({ success: true, data: inventory })
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

  const item = new Item(body);

  if (!item) {
    return res.status(400).json({ success: false, error: err });
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

  const item = await Item.findOneAndUpdate({ _id: req.body._id }, req.body, {
    new: true,
    runValidators: true
  }).exec();

  if (!item) {
    return res.status(400).json({ success: false, error: err });
  }

  await item.save();
    
  return res.status(201).json({
    success: true,
    id: item._id,
    item: 'Item updated!',
  });
};

exports.uploadImage = async (req, res) => {
  if (!req.files) {
    return res.status(400).json({ msg: 'No file to upload' });
  }
  let file = req.files.file;
  const filePath = file.tempFilePath;
  const extension = file.mimetype.split('/')[1];
  file = await jimp.read(file.tempFilePath);
  await file.resize(370, jimp.AUTO).quality(75);
  await file.writeAsync(`${filePath}.${extension}`);
  cloudinary.uploader.upload(`${filePath}.${extension}`, { "crop":"limit" }, function(err, result) { 
    if (err) {
      console.log('error', err);
    }
    res.json({ fileName: result.public_id });
  });
};