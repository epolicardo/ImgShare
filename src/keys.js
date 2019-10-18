module.exports = {
    database: {

        URI: 'mongodb://localhost/imgShare',
        name: "LocalhostDB"
    },
    databaseRemota: {
        URI: process.env.DB_REMOTA,
        name: "MongoDB Atlas"

    }
}