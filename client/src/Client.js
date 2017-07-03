function getLists(userId, cb){
    return fetch(`/api/lists/${userId}`)
        .then(res => {
            return res.json();
        })
        .then(cb)
}

const Client = {getLists };
export default Client;