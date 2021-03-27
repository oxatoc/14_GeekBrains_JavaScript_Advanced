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
        remove_item(event) {
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
        /* Наполнение каталога продуктов */
        this.fetchGet(this.goodsRouteGet)
            .then(data => {
                /* В случае успешного получения данных с сервера - очищаем сообщение об ошибке */
                this.error_message = '';

                this.goods = JSON.parse(data);
                this.filteredGoods = this.goods;
            })
            .catch(error => {

                if (error == 'stop xhr') {
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
        /* Наполнение корзины */
        this.fetchGet(this.cartRouteGet)
            .then(data => this.cart = JSON.parse(data))
            .catch(error => console.log(error));
    }
    , computed: {
        goodsRouteGet() {
            return '/data';
        }
        , cartRoutePost() {
            return '/cart';
        }
        , cartRouteGet() {
            return '/cart';
        }
        , cartRouteRemodePost() {
            return '/removegood';
        }
    }
    , methods: {
        addToCartHandler(e) {
            const id_product = e.target.dataset.id_product
            if (id_product !== undefined) {
                const good = this.goods.find(item => item.id_product == id_product);

                this.fetchPost(this.cartRoutePost, good)
                    .then(data => {
                        this.cart = JSON.parse(data);
                    })
                    .catch(error => {
                        console.log(error);
                    });
            }
        }
        , fetchGet(url) {
            return new Promise((resolve) => {

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
            });
        }
        , fetchPost(url, obj) {

            return new Promise((resolve) => {

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
                xhr.open('POST', url, true);
                xhr.setRequestHeader('Content-Type', 'application/json; charset=UTF-8');
                xhr.send(JSON.stringify(obj));
            });

        }
        , openCartHandler() {
            this.isVisibleChart = !this.isVisibleChart;
        }
        , removeFromCartHandler(index) {
            this.fetchPost(this.cartRouteRemodePost, {index: index})
                .then(data => this.cart = JSON.parse(data))
                .catch(error => console.log(error));
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
