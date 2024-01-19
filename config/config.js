const JWT = {
    jwt: process.env.TOKEN_KEY || 'secret',
    jwtExp:'100d'
}

module.exports = {JWT}