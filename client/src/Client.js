function getList(userId, cb){
    return fetch(`/api/list/${userId}`)
        .then(res => {
            return res.json();
        })
}

const Client = {getList };
export default Client;