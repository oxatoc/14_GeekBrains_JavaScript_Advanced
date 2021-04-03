/* импорт модулей */
import * as cartObj from './modules/cart_module.js';
import * as goodsObj from './modules/catalog_module.js';

/* Компонент вывода сообщения об ошибке соединения с сервером */
Vue.component('server-error-component', {
    props: ['error_message']
    , template: `
        <div v-if="error_message.length" class="alert">{{error_message}}</div>
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
    <div class="cart-container">
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
        , errors: []
    }
    , mounted() {
        /* Наполнение каталога продуктов */
        goodsObj.items()
            .then(data => {
                this.goods = data;
                this.filteredGoods = this.goods;
            })
            .catch(error => this.handleError(error));

        /* Наполнение корзины */
        cartObj.items()
            .then(data => this.cart = data)
            .catch(error => this.handleError(error));
    }

    , methods: {
        addToCartHandler(e) {
            const id_product = e.target.dataset.id_product
            if (id_product !== undefined) {
                const good = this.goods.find(item => item.id_product == id_product);

                cartObj.add(good)
                    .then(data => this.cart = data)
                    .catch(error => this.handleError(error));
            }
        }
        , openCartHandler() {
            this.isVisibleChart = !this.isVisibleChart;
        }
        , removeFromCartHandler(index) {
            cartObj.remove(index)
                .then(data => this.cart = data)
                .catch(error => this.handleError(error));
        }
        , searchHandler(searchLine) {
            if (searchLine === '') {
                this.filteredGoods = this.goods;
            }
            const regexp = new RegExp(searchLine, 'gi');
            this.filteredGoods = this.goods.filter((good) => regexp.test(good.product_name));
        }
        , handleError(error){
            this.errors.push(error);
        }
    }
});

