module.exports = {
    username:process.env.DB_USERNAME,
    database:process.env.DB_NAME,
    password:process.env.DB_PASSWORD,
    options:{
        dialect:process.env.DB_DIALECT,
        host:process.env.DB_HOST,
        logging: false
    },

}