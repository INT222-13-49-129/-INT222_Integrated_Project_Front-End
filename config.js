const configs ={
    development: {
        BASE_URL: 'http://localhost:3000/api/',
        PORT: 5000
    },
    production: {
        BASE_URL: 'https://cfan.ddns.net/backend/api/',
        PORT: 8080
    },
}

const nodeEnv = process.env.NODE_ENV
module.exports = configs[nodeEnv]
