// store in array

/*
const products = [];

module.exports = class Product {
  constructor(t){
    this.title = t;
  }

  //store product in array
  save(){
    products.push(this);
  }

  //retrieve all products from array (utility function)
  static fetchAll(){
    return products;
  }

}
*/

// using file system

const fs = require('fs');
const path = require('path');
//const { get } = require('../routes/admin');

const p = path.join(
  path.dirname(process.mainModule.filename),
  'data',
  'products.json'
);

const getProductsFromFile = cb =>{
  fs.readFile(p, (err,fileContent) =>{
    if(err) {
      //return [];
      return cb([]);
    }else{
    cb(JSON.parse(fileContent)); 
    }
  });
}

module.exports = class Product {
  constructor(t){
    this.title = t;
  }

  //store product in array
  save(){
    getProductsFromFile(products => {
      products.push(this);
      fs.writeFile(p,JSON.stringify(products),(err) => {
        console.log(err);
      });
    });
    /*
    const p = path.join(path.dirname(process.mainModule.filename),
    'data',
    'products.json');
    */
    
  }

  //retrieve all products from array (utility function)
  static fetchAll(cb){

    getProductsFromFile(cb);
    /*const p = path.join(
      path.dirname(process.mainModule.filename),
      'data',
      'products.json'
    );

    fs.readFile(p, (err,fileContent) =>{
      if(err) {
        //return [];
        cb([]);
      }
      cb(JSON.parse(fileContent));
    })
*/

  }

}