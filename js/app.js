const goods = [
    { title: 'Shirt', price: 150 },
    { title: 'Socks', price: 50 },
    { title: 'Jacket', price: 350 },
    { title: 'Shoes', price: 250 },
];

/* Задание 2 - добавить значения по умолчанию для аргуметов функции*/
const renderGoodsItem = (title = 'none', price = '0') => {
    return `<div class="goods-item"><h3>${title}</h3><p>${price}</p></div>`;
};

/* Задание 2 - вариант сокращения записи функции - без return и угловых скобок*/
const renderGoodsItem = ({ title = 'none', price = '0' }) => `<div class="goods-item"><h3>${title}</h3><p>${price}</p></div>`;

/* Задание 2 - добавить значения по умолчанию для аргуметов функции*/
const renderGoodsList = (list = goods) => {
    let goodsList = list.map(item => renderGoodsItem(item.title, item.price));
    document.querySelector('.goods-list').innerHTML = goodsList;
}

/* Задание 2 - вариант сокращения записи функции - в качестве параметра renderGoodsItem передается переменная item */
const renderGoodsList = (list = goods) => {
    let goodsList = list.map(item => renderGoodsItem(item));
    document.querySelector('.goods-list').innerHTML = goodsList;
}

/* Задание 3 - исключение запятой между товарами возможно с помощью метода .join('') */
const renderGoodsList = (list = goods) => {
    let goodsList = list.map(item => renderGoodsItem(item)).join('');
    document.querySelector('.goods-list').insertAdjacentHTML('beforeend', goodsList);

}

renderGoodsList(goods);