const configs ={
    development: {
        BASE_URL: 'http://localhost:3000/api/',
        PORT: 5000
    },
    production: {
        BASE_URL: 'https://cfan.ddnsking.com/backend/api/',
        PORT: 80
    },
}

const nodeEnv = process.env.NODE_ENV
module.exports = configs[nodeEnv]
