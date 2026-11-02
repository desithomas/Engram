const {MongoClient} = require('mongodb')

const client = new MongoClient(process.env.MONGODB_URI)

let database 

async function connectToDatabase(){
    if(database){
        return database
    }
    
    await client.connect()

database = client.db('projectbowbowdb')

console.log('connected to mongodb')

return database
}

module.exports = {
    connectToDatabase
}

