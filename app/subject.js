const express = require('express');
const db = require('../mySqlDb');
const router = express.Router();
const multer = require('multer');
const path = require("path");
const config = require('../config');
let categoryAr = [];


const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, config.uploadPath);
  },
  filename: (req, file, cb) => {
    cb(null,  path.extname(file.originalname))
  }
});

const upload = multer({storage});

router.get('/',   async (req, res, next) => {
  try {
    let query = 'SELECT * FROM subject';

    if (req.query.orderBy === 'date' && req.query.direction === 'desc') {
      query += ' ORDER BY id DESC';
    }

    let [subject] = await db.getConnection().execute(query);

    subject.forEach(item =>{
      categoryAr.push({id: item.id,name: item.name })
    })

    return res.send(categoryAr)

  } catch (e) {
    next(e);
  }
});

router.get('/:id', async (req, res, next) => {
  try {
    const [subject] = await db.getConnection().execute('SELECT * FROM subject WHERE id = ?', [req.params.id]);
    const item = subject[0];

    if (!item) {
      return res.status(404).send({message: 'Not found'});
    }
    return res.send(item);

  } catch (e) {
    next(e);
  }

})

router.post('/',upload.single('image'), async (req, res, next) => {
  try {

    const item = {
      name: req.body.name,
      category_id: req.body.category_id,
      location_id: req.body.location_id,
      description: req.body.description,
      image:null,
    };

    if (req.file) {
      item.image = req.file.filename;
    }

    let query = 'INSERT INTO subject (name, category_id,location_id,description,image) VALUES (?,?,?,?,?)';

    const [results] = await db.getConnection().execute(query, [
      item.name,
      item.category_id,
      item.location_id,
      item.description,
      item.image,
    ]);

    const id = results.insertId;
    return res.send({message: 'Created new item', id});
  } catch (e) {
    next(e);
  }

})


router.delete('/:id', async (req, res, next) => {
  try {
    await db.getConnection().execute('DELETE  FROM subject WHERE id = ?', [req.params.id]);

    return res.send('Object is deleted');

  } catch (e) {
      return res.send(`Object can not be found, ${e}`);
  }

})

module.exports = router;