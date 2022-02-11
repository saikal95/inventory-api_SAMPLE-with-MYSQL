const express = require('express');
const db = require('../mySqlDb');
const router = express.Router();


router.get('/', async (req, res, next) => {
  try {
    let query = 'SELECT * FROM subject';

    let subject = await db.getConnection().execute(query);

    // if ( !subject.description || !subject.name) {
    //   return res.send('No description and name of the subject can be found');
    // }
    // SHORTEN THE REQUEST
    return res.send(subject);

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

router.post('/', async (req, res, next) => {
  try {

    const item = {
      name: req.body.name,
      category_id: req.body.category_id,
      location_id: req.body.location_id,
      description: req.body.description,
    };

    // скрывать буффер

    let query = 'INSERT INTO subject (name,category_id,location_id, description) VALUES (?,?,?,?)';

    const [results] = await db.getConnection().execute(query, [
      item.name,
      item.category_id,
      item.location_id,
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
    await db.getConnection().execute('DELETE  FROM subject WHERE id = ?', [req.params.id]);

    return res.send('Object is deleted');

  } catch (e) {
      return res.send(`Object can not be found, ${e}`);
  }

})

module.exports = router;