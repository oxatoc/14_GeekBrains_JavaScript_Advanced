import * as httpObj from './http_module.js';

/* Получение содержания корзины */
function items(){
    return httpObj.getJson('/cart');
}

/* Добавление в корзину */
function add(good){
    return httpObj.postJson('/cart', good);
}

/* Удаление из корзины */
function remove(index){
    return httpObj.deleteJson('/cart', {index: index});
}

export {items, add, remove};