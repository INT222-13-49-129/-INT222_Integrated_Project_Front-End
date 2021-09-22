const configs ={
    development: {
        BASE_URL: 'http://localhost:3000/api/',
    },
    production: {
        BASE_URL: 'http://13.76.27.34:3000/api/'
    },
}

const nodeEnv = process.env.NODE_ENV
module.exports = configs[nodeEnv]
