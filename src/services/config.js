/* Configura o host da api que será realizado os requests e response  */
import axios from 'axios'

axios.defaults.adapter = require('axios/lib/adapters/http');
axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*'

export let http = axios.create({
    baseURL: 'http://127.0.0.1/zen-api/',
    timeout: 10000
})

