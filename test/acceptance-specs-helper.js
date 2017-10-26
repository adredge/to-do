const axios = require('axios')
const LocalService = require('./local-service')
const config = require('../server/config/config')['development'];

const localService = new LocalService('./server .js')

before(() => {
    return localService.start()
})

after(() => {
    return localService.kill()
})

module.exports = {
    makeApiCall(relativeUrl) {
        let url = `http://localhost:${config.port}/api/${relativeUrl}`
        console.log('url', url)
        return axios.get(url)
            .then(response => response.data)
    }
}