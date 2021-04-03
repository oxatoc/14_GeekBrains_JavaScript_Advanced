/* Библиотека для получения абсолютных путей */
const path = require('path');

module.exports = {
    entry: './src/app.js'
    , mode: 'development'
    , output: {
        filename: './build.js'
        , path: path.resolve(__dirname, 'public/dist')
    }
    , watch: true
    /* Отключение devtool для режима 'development' - получение читаемого кода для отладки
    см. https://webpack.js.org/configuration/devtool/*/
    , devtool: false
}
