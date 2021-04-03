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


export {deleteJson, getJson, postJson};