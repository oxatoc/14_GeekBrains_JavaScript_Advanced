const fs = require('fs');

/* npm install body-parser */
const bodyParser = require('body-parser');
const jsonParser = bodyParser.json()


const express = require('express');
const app = express();

/* Каталог - где искать index.html */
app.use(express.static('.'));

/* Старт сервера */
app.listen(3000, () => {
    console.log('server is running on port 3000!');
});

/* Маршрутизация */
app.get('/data', (req, res) => {
    new Promise((resolve, reject) => {
        fs.readFile('./goods.json', 'utf-8', (err, data) => {
            if (!err) {
                resolve(JSON.parse(data));
            } else {
                throw 'Ошибка чтения файла';
            }
        });
    })
        .then(data => {
            res.setHeader('Content-type', 'Application/json');
            res.end(JSON.stringify(data));
        })
        .catch(error => res.end(error));
});

/* Чтение содержания корзины */
app.get('/cart', (req, res) => {
    new Promise(resolve => {
        fs.readFile('./cart.json', 'utf-8', (err, data) => {
            if (!err) {
                const cart = JSON.parse(data);
                resolve(cart);
            }
        });
    })
        .then(data => {
            res.setHeader('Content-type', 'Application/json');
            res.end(JSON.stringify(data));
        })
        .catch(error => console.log(error));
});

/* Добавление товара в корзину */
app.post('/cart', jsonParser, (req, res) => {
    new Promise(resolve => {
        fs.readFile('./cart.json', 'utf-8', (err, data) => {
            if (!err) {
                const cart = JSON.parse(data);
                const item = req.body;
                cart.push(item);

                fs.writeFile('cart.json', JSON.stringify(cart), (err) => {
                    console.log('error: ' + err);
                });
                resolve(cart);
            }
        });
    })
        .then(data => {
            res.setHeader('Content-type', 'Application/json');
            res.end(JSON.stringify(data));
        })
        .catch(error => console.log(error));
});

/* Удаление товара из корзины */
app.post('/removegood', jsonParser, (req, res) => {
    new Promise(resolve => {
        fs.readFile('./cart.json', 'utf-8', (err, data) => {
            if (!err) {
                const cart = JSON.parse(data);

                const index = req.body.index;
                if (index !== undefined){
                    cart.splice(index, 1);
                    fs.writeFile('cart.json', JSON.stringify(cart), (err) => {
                        console.log('error: ' + err);
                    });
                }
                resolve(cart);
            }
        });
    })
        .then(data => {
            res.setHeader('Content-type', 'Application/json');
            res.end(JSON.stringify(data));
        })
        .catch(error => console.log(error));
});
