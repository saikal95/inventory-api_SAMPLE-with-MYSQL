const fs = require('fs').promises;

const filename = './db.json';
let data = {
  'category':[],
  'location':[],
  'subject': [],

};

module.exports = {
  async init() {
    try {
      const fileContents = await fs.readFile(filename);
      data = JSON.parse(fileContents.toString());
    } catch (e) {
      data = [];
    }
  },

  getItems() {
    return data;
  },
  getItem(id) {
    return data.find(p => p.id === id);
  },
  addItem(item) {
    item.id = nanoid();
    data.push(item);
    return this.save();
  },
  save() {
    return fs.writeFile(filename, JSON.stringify(data, null, 2));
  }
};