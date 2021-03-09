/* 
Выполнены задания:
Задание 1 - makeGETRequest переделан на использование Promise
Задание 2:
    - метод добавления товара в корзину - Cart.addGood()
    - метод удаления товара из корзины - Cart.removeGood()
    - метод получения списка товаров корзины - метод Cart.notify() передает массив товаров в корзине в представление для отображения с помощью вызова метода CartView.update(subject)
Задание 3:
    - fetchGood() возвращает Promise
    - render() вызывается в обработчике Promise.then()

Созданы классы:
- CartView - представление списка товаров в корзине - компонент Observer паттерна "Наблюдатель"
- Cart - модель данных корзины - компонент Subject паттерна "Наблюдатель"
- GoodsItem - класс товара
- GoodsList - класс перечня товаров
*/

/* Представление корзины */
class CartView {
    /* subject - объект, на изменения которого нужно подписаться */
    constructor(subject) {
        this.subject = subject;
        this.subject.attach(this);
    }

    /* реагирование на уведомление об изменении состояния корзины */
    update(subject) {

        const $tbody = document.querySelector('.excel-table-body');
        /* Удаление всех имеющихся элементов */
        while ($tbody.children.length > 0)
            $tbody.children[0].remove();

        /* Отрисовка элементов корзины*/
        let str = '';

        const basket = subject.basket;
        basket.forEach(goodItem => {
            str += `
                <tr>
                    <td class="excel-table-td">${goodItem.good.product_name}</td>
                    <td class="excel-table-td excel-table-price">${goodItem.good.price}</td>
                    <td class="excel-table-td excel-table-remove">
                        <button class="remove-button" data-cart_id="${goodItem.cart_id}" data-id_product="${goodItem.id_product}" type="button">Удалить</button>
                    </td>
                </tr>
            `;
        });

        $tbody.insertAdjacentHTML('beforeend', str);

        /* Назначаем на кнопки удаления обработчик событий */
        document.querySelectorAll('.remove-button').forEach(button => {
            button.addEventListener('click', (event) => {
                this.subject.removeGood(parseInt(event.target.dataset.cart_id));
            });
        });
    }
}

/* Модель состояния корзины */
class Cart {
    constructor() {
        this.basket = [];
        this.observers = [];
    }
    /* Добавление элемента в корзину */
    addGood(item) {
        console.log(item);

        const obj = {
            cart_id: this.basket.length
            , good: item
        }
        this.basket.push(obj);
        this.notify();
    }
    /* Удаление элемента из корзины */
    removeGood(id) {
        const good = this.basket.find(good => good.cart_id == id);
        const index = this.basket.indexOf(good);
        this.basket.splice(index, 1);
        this.notify();
    }
    /* Добавление наблюдателя - представления для отображения данных*/
    attach(observer) {
        this.observers.push(observer);
    }
    /* Оповещение наблюдателя об изменениях состояния корзины */
    notify() {
        this.observers.forEach(observer => observer.update(this));
    }
}

/* Задание 1 - переделка makeGETRequest() на Promise */
function makeGETRequest(url) {
    return new Promise((resolve, reject) => {
        let xhr;
        if (window.XMLHttpRequest) {
            xhr = new XMLHttpRequest();
        } else if (window.ActiveXObject) {
            xhr = new ActiveXObject("Microsoft.XMLHTTP");
        }
        xhr.onreadystatechange = function () {
            /* state = 4 - запрос выполнен */
            if (xhr.readyState === 4) {
                console.log(xhr.responseText);
                resolve(xhr.responseText);
            }
        }
        xhr.open('GET', url, true);
        xhr.send();
    });
}

class GoodsItem {
    constructor(good) {
        this.good = good;
    }
    render() {
        return `<div class="goods-item">
                    <div class="goods-item-flex">
                        <div class="goods-item-banner"></div>
                        <h3>${this.good.product_name}</h3>
                        <p>${this.good.price}</p>
                    </div>
                    <div>
                        <button type="button" class="goods-item-button" data-id_product="${this.good.id_product}">Добавить</button>
                    </div>
                </div>`;
    }
}

class GoodsList {
    /* cart - модель данных корзины - инжектируем явно */
    constructor(cart) {
        this.goods = [];
        this.cart = cart;
    }

    getTotal() {
        return this.goods.reduce((acc, { price }) => acc + price, 0);
    }

    /* Задание 3 - fetchGoods() переделка на Promise */
    fetchGoods() {
        return new Promise((resolve, reject) => {
            const API_URL = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses';

            makeGETRequest(`${API_URL}/catalogData.json`)
                .then(goods => {
                    this.goods = JSON.parse(goods);
                    resolve(true);
                });
        });
    }

    render() {
        let listHtml = '';
        this.goods.forEach((good) => {
            const goodItem = new GoodsItem(good);
            listHtml += goodItem.render();
        });
        document.querySelector('.goods-list').insertAdjacentHTML('beforeend', listHtml);
        /* Назначение на кнопки обработчика событий добавления в корзину */
        document.querySelectorAll('.goods-item-button').forEach(button => button.addEventListener('click', (event) => {
            const good = this.goods.find(product => product.id_product == event.target.dataset.id_product);
            this.cart.addGood(good);
        }));
    }
}


//Инициализация объектов
const cart = new Cart();
const cv = new CartView(cart);
const list = new GoodsList(cart);

/* Задание 3 - переделка на передачу через обработчик Promise */
list.fetchGoods()
    .then(() => list.render());
