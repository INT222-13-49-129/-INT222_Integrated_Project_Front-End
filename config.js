const configs ={
    development: {
        BASE_URL: 'http://localhost:3000/api/',
    },
    production: {
        BASE_URL: ''
    },
}

const nodeEnv = process.env.NODE_ENV
module.exports = configs[nodeEnv]