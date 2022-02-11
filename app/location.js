const express = require('express');
const db = require('../mySqlDb');
const router = express.Router();

router.get('/', async (req, res, next) => {
  try {
    let query = 'SELECT * FROM location';

    let [location] = await db.getConnection().execute(query);

    return res.send(location);
  } catch (e) {
    next(e);
  }
});

router.get('/:id', async (req, res, next) => {
  try {
    const [location] = await db.getConnection().execute('SELECT * FROM location WHERE id = ?', [req.params.id]);
    const item = location[0];

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


    let query = 'INSERT INTO location (name, description) VALUES (?,?)';

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
    const [location] = await db.getConnection().execute('DELETE FROM location WHERE id = ?', [req.params.id]);
    const item = location[0];




    if(!item){
      return res.send('Object can not be found');
      // почему проверка не срабатывает надо дать возможность удалять сначала отсюда
    }


    return res.send('Object is deleted');



  } catch (e) {
    next(e);
  }

})





module.exports = router;