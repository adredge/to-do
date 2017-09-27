import axios from 'axios'

function getList(userId, cb){
    return fetch(`/api/list/${userId}`)
        .then(res => {
            return res.json();
        })
}

function addItem(userId, listId, newItemName){
    const data = {userId, listId, newItemName}
    return axios.post('api/addItem', data).then(res => {
        console.log('resolved', res)
        return res.data})
}

function removeItem(listId, itemId, userId){
    const data = {listId, itemId, userId}
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