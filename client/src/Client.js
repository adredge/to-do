import axios from 'axios'

function getList(userId, cb){
    return fetch(`/api/list/${userId}`)
        .then(res => {
            return res.json();
        })
}

// exports.createUserBookmark = function (contentId) {
//   return (dispatch) => {
//     return axios.post(apiRoutes.userBookmarksOld, {contentId})
//       .then(() => dispatch(exports.fetchUserBookmarks()))
//   }
// }

function checkItem(itemId, completedAt){
    // var data = {itemId, completedAt}
    // return fetch(`/api/checkItem/`,
    // {
    //     method: "POST",
    //     body: JSON.stringify(data)
    // })
    let data = {itemId, completedAt}
    console.log('data', data)
    return axios.post('api/checkItem', data)
    // .then(response => console.log('response', response))
}

function uncheckItem(itemId){
    // return fetch(`/api/uncheckItem/`,
    // {
    //     method: "POST",
    //     body: JSON.stringify({itemId})
    // })
    return axios.post('api/uncheckItem', {itemId})
    // .then(response => console.log('response', response))
}

const Client = {getList, checkItem, uncheckItem };
export default Client;