const sha256 = require('js-sha256');

class KeyValuePair {
  constructor(key, value) {
    this.key = key;
    this.value = value;
    this.next = null;
  }
}

class HashTable {

  constructor(numBuckets = 4) {
    this.data = [ null,
                  null,
                  null,
                  null ];
    this.data.length = numBuckets;
    this.capacity = numBuckets;
    this.count = 0;
  }

  hash(key) {
    let string = sha256(key).substring(0,8);
    return parseInt(string, 16);
  }

  hashMod(key) {
    return this.hash(key) % this.capacity;
  }

  insertNoCollisions(key, value) {
    let index = this.hashMod(key);
    if(this.data[index] !== null){
      throw new Error("hash collision or same key/value pair already exists!");
    }
    this.data[index] = new KeyValuePair(key, value);
    this.count++;
  }

  insertWithHashCollisions(key, value) {
    let index = this.hashMod(key);
    let newKeyValue = new KeyValuePair(key, value);

    if(this.data[index] !== null){
      let node = this.data[index];

      while(node.next !== null){
        if(node.key === key){
          return;
        }
        node = node.next;
      }
      node.next = newKeyValue;
    }
    else{
      this.data[index] = newKeyValue;
    }

    this.count++;
  }

  insert(key, value) {
    let index = this.hashMod(key);
    let newKeyValue = new KeyValuePair(key, value);

    if(this.data[index] !== null){
      let node = this.data[index];

      while(node.next !== null){
        if(node.key === key){
          console.log("overwriting key " + node.key);
          node.value = value;
          return;
        }
        node = node.next;
      }
      node.next = newKeyValue;
    }
    else{
      this.data[index] = newKeyValue;
    }

    this.count++;
  }

}


module.exports = HashTable;
