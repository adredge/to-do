import axios from 'axios'

function getList(){
    return axios.get('/api/list')
        .then(res => {
            if(!res.data)
                return createList()
            return res.data
        })
}

function createList(){
    return axios.post('api/createList').then(res => {
        return axios.get('/api/list').then(res => res.data)
    })
}

function addItem(listId, newItemName){
    const data = {listId, newItemName}
    return axios.post('api/addItem', data).then(res => res.data)
}

function removeItem(listId, itemId){
    return axios.delete(`api/removeItem/${listId}/${itemId}`).then(res => res.data)
}

function checkItem(itemId, completedAt){
    const data = {itemId, completedAt}
    return axios.put('api/checkItem', data).then(response => response.data)
}

function uncheckItem(itemId){
    return axios.put('api/uncheckItem', {itemId})
}

const Client = {getList, checkItem, uncheckItem, addItem, removeItem };
export default Client;