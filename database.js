const mongoose = require("mongoose");
var Schema = mongoose.Schema;

var productSchema = new Schema({
    "id": {
      "type" : Number,
      "unique" : true // prevent duplicating id value
    },
    "title" : String,
    "variants" : [{
      "id": Number,
      "price": String
    }],
    "images" : [{
        "src" : String
    }]},
    {
      versionKey: false
    }
);

let product;
let db = mongoose.createConnection("mongodb://products:qkaekswk1@ds157895.mlab.com:57895/product", 
    { useNewUrlParser: true,
      useCreateIndex: true, }
);
db.on('error', (err) => {
    console.log(err);
});
db.once('open', () => {
    product = db.model("products", productSchema);
    console.log('Connected Database');
});

module.exports.getData = () => {
    return new Promise((resolve, reject) => {
        product.find({}).sort({ id : 0 }).then((data) => {
            resolve(data);
        }).catch((err) => {
            reject(err);
        })
    })
};

module.exports.storeData = (data) => {
    return new Promise((resolve, reject) => {
        product.create(data).then(() => {
            resolve();
        }).catch((err) => {
            reject(err);
        })
    })
};
