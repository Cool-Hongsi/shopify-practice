const Shopify = require('shopify-api-node');
const express = require('express');
const app = express();
const port = process.env.PORT || 8080;
const db = require('./database');

const shopify = new Shopify({
  shopName: 'gointegrations-devtest.myshopify.com', // host name
  apiKey: 'edd7fd7dac31cb81df28f91455649911',
  password: '330c304080eb8a70845b94ad0269bc50'
});

app.get('/', (req, res) => {
    res.send("Hello, This is Sungjun Hong");
});

app.get('/api/showData', (req, res) => {
    db.getData().then((data) => {
        res.json(data);
    }).catch((err) => {
        console.log(err);
    })
});

app.get('/api/storeData', (req, res) => {
    shopify.product.list([]).then(data => {
        db.storeData(data).then(() => {
            res.json("OK");
        }).catch((err) => {
            console.log(err);
        })
    }).catch(err => console.log(err));
});

app.post('/api/orderData/:id', (req, res) => {
    // Not really sure about this part
    shopify.draftOrder.create({ variant_id: parseInt(req.params.id) })
    .then(order => console.log(order))
    .catch(err => console.error(err));
});

app.listen(port, () => {
    console.log(`Connected ${port}`);
});

