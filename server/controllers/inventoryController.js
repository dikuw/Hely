const mongoose = require('mongoose');
const Item = require('../models/Item');

exports.getInventory = async (req, res) => {
  await Item.find({ "show": true }, (err, inventory) => {
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

exports.postItem = async (req, res) => {
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

exports.archiveInventory = async (req, res, next) => {
  await Item.updateMany({}, { $set: { show: false } })
  next();
}

exports.putInventory = async (req, res) => {
  const body = req.body;
  Object.values(body).forEach(async (item) => {
    delete item._id;
    await new Item(item).save();
  })
  return res.send(body);
};

exports.uploadImage = async (req, res) => {
  if (!req.files) {
    return res.status(400).json({ msg: 'No file uploaded son' });
  }

  const file = req.files.file;
  const extension = file.mimetype.split('/')[1];
  file.name = `${Date.now()}.${extension}`;
  //  TODO resize photo using jimp, e.g:
  //  ** 😖 right now this just hangs 😖 **
  //  👍 👍 don't forget to import jimp above 👍 👍 
  // const photo = await jimp.read(req.files.file.buffer);
  // await photo.resize(800, jimp.AUTO);
  // await photo.write(`../client/public/images/${photo}`);

  file.mv(`../client/public/images/${file.name}`, err => {
    if (err) {
      console.error(err);
      return res.status(500).send(err);
    }
    res.json({ fileName: file.name, filePath: `/uploads/${file.name}` });
  });
};