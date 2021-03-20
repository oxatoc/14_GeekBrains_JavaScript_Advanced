new Vue({
    el: '#app'
    , data: {
        goods: []
        , filteredGoods: []
        , cart: []
        , searchLine: ''
        , isVisibleChart: false
    }
    , mounted() {
        this.fetchPromise();
    }
    , methods: {
        addToCart(index){
            this.cart.push(this.filteredGoods[index]);
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
                this.goods = JSON.parse(data);
                this.filteredGoods = this.goods;
            })
            .catch(error => {
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
            });
        }
        , openCartHandler(){
            this.isVisibleChart = !this.isVisibleChart;
        }
        , removeFromCart(index){
            this.cart.splice(index, 1);
        }
        , filterGoods() {
            if (this.searchLine === '') {
                this.filteredGoods = this.goods;
            }
            const regexp = new RegExp(this.searchLine, 'gi');
            this.filteredGoods = this.goods.filter((good) => regexp.test(good.product_name));
        }
    }
});
