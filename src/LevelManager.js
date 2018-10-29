/* ===== Persist data with LevelDB ===================================
|  Learn more: level: https://github.com/Level/level     |
|  =============================================================*/

const level = require("level");
const db = level("./db");

// Add data to levelDB with key/value pair
function addLevelDBData(key, value) {
  return new Promise(function(resolve, reject) {
    db.put(key, value, function(err) {
      if (err) {
        console.log("Block " + key + " submission failed", err);
        reject(err);
      } else {
        resolve({success:true, height:key});
      }
    });
  });
}

// Get data from levelDB with key
function getLevelDBData(key) {
  return new Promise(function(resolve, reject) {
    db.get(key, function(err, value) {
      if (err) {
        console.log("Not found!", err);
        reject(err);
      } else {
        resolve(value);
      }
    });
  });
}


module.exports = {
  getLevelDBData,
  addLevelDBData, 
};
