/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/modules/cart_module.js":
/*!************************************!*\
  !*** ./src/modules/cart_module.js ***!
  \************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "items": () => (/* binding */ items),
/* harmony export */   "add": () => (/* binding */ add),
/* harmony export */   "remove": () => (/* binding */ remove)
/* harmony export */ });
/* harmony import */ var _http_module_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./http_module.js */ "./src/modules/http_module.js");


/* Получение содержания корзины */
function items(){
    return _http_module_js__WEBPACK_IMPORTED_MODULE_0__.getJson('/cart');
}

/* Добавление в корзину */
function add(good){
    return _http_module_js__WEBPACK_IMPORTED_MODULE_0__.postJson('/cart', good);
}

/* Удаление из корзины */
function remove(index){
    return _http_module_js__WEBPACK_IMPORTED_MODULE_0__.deleteJson('/cart', {index: index});
}



/***/ }),

/***/ "./src/modules/catalog_module.js":
/*!***************************************!*\
  !*** ./src/modules/catalog_module.js ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "items": () => (/* binding */ items)
/* harmony export */ });
/* harmony import */ var _http_module_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./http_module.js */ "./src/modules/http_module.js");


/* Получение каталога товаров */
function items(){
    return _http_module_js__WEBPACK_IMPORTED_MODULE_0__.getJson('/data');
}



/***/ }),

/***/ "./src/modules/http_module.js":
/*!************************************!*\
  !*** ./src/modules/http_module.js ***!
  \************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "deleteJson": () => (/* binding */ deleteJson),
/* harmony export */   "getJson": () => (/* binding */ getJson),
/* harmony export */   "postJson": () => (/* binding */ postJson)
/* harmony export */ });
/* Получение объекта через выгрузку JSON методом GET */
function getJson(url) {
    return fetch(url)
        .then(response => {
            if (response.ok) {
                return response.json();
            } else {
                throw `url: '${url}' - статус ответа сервера: ${response.status}`;
            }
        })
}

/* Преобразование объекта в JSON, отправка методом POST, получение результатат от сервера */
function postJson(url, obj) {
    return fetch(url, {
        method: 'POST'
        , headers: {
            'Content-Type': 'application/json'
        }
        , body: JSON.stringify(obj)
    })
        .then(response => {
            if (response.ok) {
                return response.json();
            } else {
                throw `url: '${url}' - статус ответа сервера: ${response.status}`;
            }
        })
}

/* DELETE-запрос HTTP */
function deleteJson(url, obj) {
    return fetch(url, {
        method: 'DELETE'
            , headers: {
            'Content-Type': 'application/json'
        }
    , body: JSON.stringify(obj)
    })
        .then(response => {
            if (response.ok) {
                return response.json();
            } else {
                throw `url: '${url}' - статус ответа сервера: ${response.status}`;
            }
        })
}




/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!********************!*\
  !*** ./src/app.js ***!
  \********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _modules_cart_module_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modules/cart_module.js */ "./src/modules/cart_module.js");
/* harmony import */ var _modules_catalog_module_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./modules/catalog_module.js */ "./src/modules/catalog_module.js");
/* импорт модулей */



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
        _modules_catalog_module_js__WEBPACK_IMPORTED_MODULE_1__.items()
            .then(data => {
                this.goods = data;
                this.filteredGoods = this.goods;
            })
            .catch(error => this.handleError(error));

        /* Наполнение корзины */
        _modules_cart_module_js__WEBPACK_IMPORTED_MODULE_0__.items()
            .then(data => this.cart = data)
            .catch(error => this.handleError(error));
    }

    , methods: {
        addToCartHandler(e) {
            const id_product = e.target.dataset.id_product
            if (id_product !== undefined) {
                const good = this.goods.find(item => item.id_product == id_product);

                _modules_cart_module_js__WEBPACK_IMPORTED_MODULE_0__.add(good)
                    .then(data => this.cart = data)
                    .catch(error => this.handleError(error));
            }
        }
        , openCartHandler() {
            this.isVisibleChart = !this.isVisibleChart;
        }
        , removeFromCartHandler(index) {
            _modules_cart_module_js__WEBPACK_IMPORTED_MODULE_0__.remove(index)
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


})();

/******/ })()
;