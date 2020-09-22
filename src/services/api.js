const axios = require('axios')

const api = axios.create({
  baseURL: 'http://biblioteca.supero.com.br/api'
})

module.exports = api
