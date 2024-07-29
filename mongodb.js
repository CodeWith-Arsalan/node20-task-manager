// CRUD operations Create Read Update Delete

const mongodb = require('mongodb')
const mongoClient = mongodb.MongoClient

const connectionURL = 'mongodb://127.0.0.1:27017'
const databaseName = 'task-manager'

// mongoClient.connect(connectionURL, (error, client) => {
//     console.log("im here")
//     if(error)
//     {
//         return console.error('unable to connect to database', error)
//     }

//     console.log("Connected Successfully")
// })

async function connectToDatabase() {
    try {
        const client = await mongoClient.connect(connectionURL);
        console.log("Connected Successfully");
        // You can add additional code to work with the database here if needed.
        const db = client.db(databaseName)
        const collection = db.collection('users')
        

        // const result = await collection.insertOne({
        //     name: 'Arsalan',
        //     age: 24
        // })

        const result = await collection.insertMany([
            {
                name: 'Sajid',
                age: 26
            },
            {
                name: 'wasif',
                age: 28
            }
        ])

        console.log(result)
        client.close(); // Close the connection when done.
    } catch (error) {
        console.error('Unable to connect to database:', error);
    }
}

connectToDatabase();