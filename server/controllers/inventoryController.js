const mongoose = require('mongoose');
const Item = require('../models/Item');

//  used for photo upload
const multer = require('multer');
const jimp = require('jimp');
const uuid = require('uuid');

exports.createInventoryItem = async (req, res) => {
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
  })
}

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
}

// const multerOptions = {
//   storage: multer.memoryStorage(),
//   fileFilter(req, file, next) { 
//     const isPhoto = file.mimetype.startsWith('image/');
//     if(isPhoto) {
//       next(null, true);
//     } else {
//       next({ message: 'That filetype isn\'t allowed!' }, false);
//     }
//   }
// };

// exports.upload = multer(multerOptions).single('photo');

exports.uploadImage = async (req, res) => {
  if (!req.files) {
    return res.status(400).json({ msg: 'No file uploaded son' });
  }

  const file = req.files.file;

  file.mv(`../client/public/images/${file.name}`, err => {
    if (err) {
      console.error(err);
      return res.status(500).send(err);
    }

    res.json({ fileName: file.name, filePath: `/uploads/${file.name}` });
  });

  // const extension = req.file.mimetype.split('/')[1];
  // req.body.photo = `${uuid.v4()}.${extension}`;
  // // now we resize
  // const photo = await jimp.read(req.file.buffer);
  // await photo.resize(800, jimp.AUTO);
  // await photo.write(`./public/images/${req.body.photo}`);
  // return res.status(201).json({
  //   success: true,
  //   item: 'Photo uploaded!'
  // })
};