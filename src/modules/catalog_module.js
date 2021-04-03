import * as httpObj from './http_module.js';

/* Получение каталога товаров */
function items(){
    return httpObj.getJson('/data');
}

export {items};