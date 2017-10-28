import axios from 'axios'

function getList(){
    return fetch(`/api/list`)
        .then(res => {
            return res.json();
        })
}

function addItem(listId, newItemName){
    const data = {listId, newItemName}
    return axios.post('api/addItem', data).then(res => {
        console.log('resolved', res)
        return res.data})
}

function removeItem(listId, itemId){
    const data = {listId, itemId}
    return axios.post('api/removeItem', data).then(res => {
        console.log('resolved', res)
        return res.data})
}

function checkItem(itemId, completedAt){
    const data = {itemId, completedAt}
    return axios.post('api/checkItem', data).then(response => response.data)
}

function uncheckItem(itemId){
    return axios.post('api/uncheckItem', {itemId})
}

const Client = {getList, checkItem, uncheckItem, addItem, removeItem };
export default Client;