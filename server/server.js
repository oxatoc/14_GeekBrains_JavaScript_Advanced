const fs = require('fs');

/* npm install body-parser */
const bodyParser = require('body-parser');
const jsonParser = bodyParser.json()


const express = require('express');
const app = express();

const CART_FILE_PATH = './cart.json';
const GOODS_FILE_PATH = './goods.json'
const NAMED_ROUTES = {
    goods: '/data'
    , cart: '/cart'
};

/* Каталог - где искать index.html */
app.use(express.static('../public'));

/* Старт сервера */
app.listen(3000, () => {
    console.log('server is running on port 3000!');
});

/* Чтение каталога товаров */
app.get(NAMED_ROUTES.goods, (req, res) => {
    new Promise((resolve, reject) => {
        fs.readFile(GOODS_FILE_PATH, 'utf-8', (err, data) => {
            if (!err) {
                resolve(JSON.parse(data));
            } else {
                reject(err);
            }
        });
    })
        .then(data => sendResponse(res, data))
        .catch(error => sendError(res, error));
});

/* Чтение содержания корзины */
app.get(NAMED_ROUTES.cart, (req, res) => {
    new Promise((resolve, reject) => {
        fs.readFile(CART_FILE_PATH, 'utf-8', (err, data) => {
            if (!err) {
                const cart = JSON.parse(data);
                resolve(cart);
            } else {
                reject(err);
            }
        });
    })
        .then(data => sendResponse(res, data))
        .catch(error => sendError(res, error));
});

/* Добавление товара в корзину */
app.post(NAMED_ROUTES.cart, jsonParser, (req, res) => {
    new Promise((resolve, reject) => {
        fs.readFile(CART_FILE_PATH, 'utf-8', (err, data) => {
            if (!err) {
                const cart = JSON.parse(data);
                const item = req.body;
                cart.push(item);

                fs.writeFile(CART_FILE_PATH, JSON.stringify(cart), (err) => {
                    if (err){
                        reject(err);
                    }
                });
                resolve(cart);
            } else {
                reject(err);
            }
        });
    })
        .then(data => sendResponse(res, data))
        .catch(error => sendError(res, error));
});

/* Удаление товара из корзины */
app.delete(NAMED_ROUTES.cart, jsonParser, (req, res) => {
    new Promise((resolve, reject) => {
        fs.readFile(CART_FILE_PATH, 'utf-8', (err, data) => {
            if (!err) {
                const cart = JSON.parse(data);

                const index = req.body.index;
                if (index !== undefined){
                    cart.splice(index, 1);
                    fs.writeFile(CART_FILE_PATH, JSON.stringify(cart), (err) => {
                        if (err){
                            reject(err);
                        }
                    });
                }
                resolve(cart);
            } else {
                reject(err);
            }
        });
    })
        .then(data => sendResponse(res, data))
        .catch(error => sendError(res, error));
});

/* Отправка данных клиенту */
function sendResponse (resObj, data){
    resObj.setHeader('Content-type', 'Application/json');
    resObj.end(JSON.stringify(data));
}

/* Отправка ошибки клиенту */
function sendError(resObj, error){
    resObj.setHeader('Content-type', 'Application/json');
    resObj.end(JSON.stringify(error));
}