/* Компонент вывода сообщения об ошибке соединения с сервером */
Vue.component('server-error-component', {
    props: ['error_message']
    , template: `
        <div v-if="error_message.length" class="alert">Ошибка соединения с сервером: '{{error_message}}'</div>
    `
});

/* Компонент строки поиска */
Vue.component('search-component', {
    template: `
        <input id="search" v-model="searchLine" @input="filterGoods">
    `
    , data() {
        return {
            searchLine: ''
        }
    }
    , methods: {
        filterGoods() {
            this.$emit('search_event', this.searchLine)
        }
    }
});

/* Компонент товара из корзины */
Vue.component('cart-item-component', {
    template: `
        <tr class="good-item" >
            <td class="excel-table-td">{{good.product_name}}</td>
            <td class="excel-table-td excel-table-price">{{good.price}}</td>
            <td class="excel-table-td excel-table-remove">
                <button @click="remove_item"
                    class="remove-button"
                    type="button"
                    :data-index = index
                >
                    Удалить
                </button>
            </td>
        </tr>   
    `
    , props: ['good', 'index']
    , methods: {
        remove_item(event){
            this.$emit('remove', event.target.dataset.index);
        }
    }
});

/* Компонент корзины товаров */
Vue.component('cart-component', {
    template: `
    <div>
        <button class="cart-button" type="button" @click="openCartHandler">
            Корзина
        </button>
        <div v-if="isVisibleChart">
            <div>Корзина</div>
            <slot></slot>
        </div>
    </div>
    `
    , data() {
        return {isVisibleChart: false}
    }
    , methods: {
        openCartHandler() {
            this.isVisibleChart = !this.isVisibleChart
        }
    }
});


new Vue({
    el: '#app'
    , data: {
        goods: []
        , filteredGoods: []
        , cart: []
        , searchLine: ''
        , isVisibleChart: false
        , error_message: ''
    }
    , mounted() {
        this.fetchPromise();
    }
    , methods: {
        addToCartHandler(e) {
            const id_product = e.target.dataset.id_product
            if (id_product !== undefined){
                const good = this.goods.find( item => item.id_product == id_product);
                this.cart.push(good);
            }
        }
        , fetchPromise() {
            const API_URL = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses';
            const url = `${API_URL}/catalogData.json`;

            return new Promise((resolve) => {

                /* Исключение для отладки - вместо выгрузки данных с сервера -
                * наполняем массив товаров из обработчика исключений .catch()*/
                throw "stop xhr";

                let xhr;
                if (window.XMLHttpRequest) {
                    xhr = new XMLHttpRequest();
                } else if (window.ActiveXObject) {
                    xhr = new ActiveXObject("Microsoft.XMLHTTP");
                }
                xhr.onreadystatechange = function () {
                    /* state = 4 - запрос выполнен */
                    if (xhr.readyState === 4) {
                        resolve(xhr.responseText);
                    }
                }
                xhr.open('GET', url, true);
                xhr.send();
            }).then(data => {
                /* В случае успешного получения данных с сервера - очищаем сообщение об ошибке */
                this.error_message = '';

                this.goods = JSON.parse(data);
                this.filteredGoods = this.goods;
            })
                .catch(error => {

                    if (error == 'stop xhr'){
                        /* локальные тестовые данные */
                        this.goods = [
                            {product_name: 'Shirt', price: 150, id_product: 1},
                            {product_name: 'Socks', price: 50, id_product: 2},
                            {product_name: 'Jacket', price: 350, id_product: 3},
                            {product_name: 'Shoes', price: 250, id_product: 4},
                        ];

                        /* Тест пустого списка товаров */
                        //this.goods = [];

                        this.filteredGoods = this.goods;
                        return;
                    }

                    /* Отображение компонента с сообщением об ошибке обращения к серверу */
                    this.error_message = error.message;

                });
        }
        , openCartHandler() {
            this.isVisibleChart = !this.isVisibleChart;
        }
        , removeFromCartHandler(index) {
            console.log(index);
            // const id_product = e.target.dataset.id_product
            // if (id_product !== undefined){
            //     const goodIndex = this.cart.findIndex( item => item.id_product == id_product);
            //     this.cart.splice(goodIndex, 1);
            // }
            this.cart.splice(index, 1);
        }
        , searchHandler(searchLine) {
            if (searchLine === '') {
                this.filteredGoods = this.goods;
            }
            const regexp = new RegExp(searchLine, 'gi');
            this.filteredGoods = this.goods.filter((good) => regexp.test(good.product_name));
        }
    }
});
