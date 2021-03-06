/* Задание 1 - пустой класс для корзины товаров  */
class Busket {
    /* 
    Свойства класса:
    - массив товаров

    Методы реагирования на действия пользователя:
    - добавление, удаление позиции товара
    - если пользователь кликнул "добавить" по товару несколько раз, то проверка - если такой товар уже есть в корзине, то увеличение количества к покупке
    - расчет стоимости всех позиций корзины
    - возвращение значений атрибутов HTML и CSS для отрисовки корзины в шаблоне HTML
    - отправка корзины на сервер для оформления заказа
     */
}

/* Задание 1 - пустой класс для элемента корзины товаров */
class BusketItem {
    /* 
    Свойства класса:
    - название, цена, количество к покупке

    Методы:
    - возвращение значений атрибутов HTML и CSS для отрисовки корзины в шаблоне HTML
    - расчет стоимости позиции на основе цены и количества к покупке
    - слушатель события нажатия кнопки "добавить" - вызов метода класса корзины для добавления товара
    */
}

/* Задание 2 - добавлен метод определения суммарной стоимости товаров 'getTotal'*/
class GoodsList {
    constructor() {
        this.goods = [];
    }

    getTotal() {
        return this.goods.reduce((acc, { price }) => acc + price, 0);
    }

    fetchGoods() {
        this.goods = [
            { title: 'Shirt', price: 150 },
            { title: 'Socks', price: 50 },
            { title: 'Jacket', price: 350 },
            { title: 'Shoes', price: 250 },
        ];
    }

    render() {
        let listHtml = '';
        this.goods.forEach(good => {
            const goodItem = new GoodsItem(good.title, good.price);
            listHtml += goodItem.render();
        });
        document.querySelector('.goods-list').insertAdjacentHTML('beforeend', listHtml);
    }
}

/* Проверка результата задания 2: */
let gl = new GoodsList();
gl.fetchGoods();
console.log(gl.getTotal());
console.log(gl.goods);

/* Задание 3 */
/* Реализация класса */
class Hamburger {

    constructor(size, stuffing) {
        this.baselist = [
            { type: 'size', value: 'small', price: 50, calories: 20 }
            , { type: 'size', value: 'large', price: 100, calories: 40 }
            , { type: 'stuffing', value: 'cheese', price: 10, calories: 20 }
            , { type: 'stuffing', value: 'salad', price: 20, calories: 5, }
            , { type: 'stuffing', value: 'potato', price: 15, calories: 10 }
            , { type: 'topping', value: 'seasoning', price: 15, calories: 0 }
            , { type: 'topping', value: 'mayo', price: 20, calories: 5 }
        ];
        this.composition = [];
        /* Добавление размера гамбургера */
        this.composition.push(this.baselist.find(({ value }) => value == size));
        /* Добавление начинки гамбургера */
        this.composition.push(this.baselist.find(({ value }) => value == stuffing));
    }
    addTopping(topping) {// Добавить добавку
        const obj = this.baselist.find(({ value }) => value == topping)
        if (obj !== undefined) {
            this.composition.push(obj);
        }
    }
    removeTopping(topping) {// Убрать добавку
        let index = this.composition.indexOf(topping)
        if (index != -1) {
            this.composition.splice(index, 1)
        }
    }
    getToppings() {// Получить список добавок 
        return this.composition.filter(({ type }) => type == 'topping');
    }
    getSize() {// Узнать размер гамбургера 
        return this.composition.find(({ type }) => type == 'size');
    }
    getStuffing() {// Узнать начинку гамбургера 
        return this.composition.filter(({ type }) => type == 'stuffing');
    }
    calculatePrice() {// Узнать цену 
        return this.composition.reduce((acc, { price }) => acc + price, 0);
    }
    calculateCalories() {// Узнать калорийность 
        return this.composition.reduce((acc, { calories }) => acc + calories, 0);
    }
}

/* Тестирование класса */
const largeBurger = new Hamburger('large', 'cheese');
largeBurger.addTopping('mayo');
console.log(largeBurger.calculatePrice());

const smallBurger = new Hamburger('small', 'salad');
smallBurger.addTopping('mayo');
console.log(smallBurger.calculatePrice());


