const express = require('express');
const db = require('../mySqlDb');
const router = express.Router();

let categoryAr = [];

router.get('/', async (req, res, next) => {
  try {
    let query = 'SELECT * FROM category';
    let [category] = await db.getConnection().execute(query);

    category.forEach(item =>{
      categoryAr.push({id: item.id,name: item.name })
    })
    return res.send(categoryAr)

  } catch (e) {
    next(e);
  }
});

router.get('/:id', async (req, res, next) => {
  try {
    const [category] = await db.getConnection().execute('SELECT * FROM category WHERE id = ?', [req.params.id]);
    const item = category[0];

    if (!item) {
      return res.status(404).send({message: 'Not found'});
    }

    return res.send(item);
  } catch (e) {
    next(e);
  }

})

router.post('/', async (req, res, next) => {
  try {
    if (!req.body.name) {
      return res.status(400).send({message: 'Body is required'});
    }

    const item = {
      name: req.body.name,
      description: req.body.description,
    };


    let query = 'INSERT INTO category (name, description) VALUES (?,?)';

    const [results] = await db.getConnection().execute(query, [
      item.name,
      item.description,
    ]);

    const id = results.insertId;

    return res.send({message: 'Created new item', id});
  } catch (e) {
    next(e);
  }

})

  router.delete('/:id', async (req, res, next) => {
    try {
     await db.getConnection().execute('DELETE  FROM category WHERE id = ?', [req.params.id]);

      return res.send('Object is deleted');

    } catch(e) {
        return res.send(`Object can not be found, ${e}`);
      }


  })



router.put('/:id', async (req, res, next) => {
  try {

    const [category] = await db.getConnection().execute('UPDATE category SET { name: category[0].name, description: category[0].description } WHERE id = ?', [req.params.id]);
    const item = category[0];


    if(!item){
      return res.send('Object can not be found');
      // почему проверка не срабатывает
    }

    return res.send(item);


  } catch (e) {
    next(e);
  }

})




module.exports = router;