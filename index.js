const express = require('express');
const cors = require('cors');
const db = require('./mySqlDb');
const category = require('./app/category');
const location = require('./app/location');
const subject = require('./app/subject');
const app = express();

const port = 8000;

app.use(cors({origin: 'http://localhost:4200'}));
app.use(express.json());
app.use(express.static('public'));


app.use('/category', category);
app.use('/location', location);
app.use('/subject', subject)

const run = async () => {
  await db.init();

  app.listen(port, () => {
    console.log(`Server started on ${port} port!`);
  });
};

run().catch(e => console.error(e));