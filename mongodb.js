// CRUD operations Create Read Update Delete

//const mongodb = require('mongodb')
const {MongoClient, ObjectId} = require('mongodb')

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
        const client = await MongoClient.connect(connectionURL);
        console.log("Connected Successfully");
        // You can add additional code to work with the database here if needed.
        const db = client.db(databaseName)
        const collection = db.collection('users')
        const collectionTasks = db.collection('tasks')
        

        // const result = await collection.insertOne({
        //     name: 'Arsalan',
        //     age: 24
        // })

        // const result = await collection.insertMany([
        //     {
        //         name: 'Sajid',
        //         age: 26
        //     },
        //     {
        //         name: 'wasif',
        //         age: 28
        //     }
        // ])

        // const result = await collectionTasks.insertMany([
        //     {
        //         description: 'Clean the house',
        //         completed: true
        //     },
        //     {
        //         description: 'Renew inspection',
        //         completed: false
        //     },
        //     {
        //         description: 'Pot Plants',
        //         completed: false
        //     }
        // ])

        // console.log(result)

    //     const result = await collection.findOne({name: "sajid"})

    //     if (result)
    //     {
    //         console.log("User Found", result)
    //     } else 
    //     {
    //         console.log("User not found")
    //     }
    

    //  const find = await collection.find({age: 24})
    //  const result = await find.toArray()
    //  if (result.length > 0)
    //  {
    //     console.log("result: ",result)
    //  }else{
    //     console.log("Error finding user")
    //  }
    //console.log(result)

    // const result = await collection.updateOne(
    //     {
    //         _id: new ObjectId("66a636ca6174a443f1739892")
    //     },
    //     {
    //         $set: {
    //             name: "Sultan Farhan"
    //         }
    //     }
    // )

    // if(result.matchedCount === 0)
    // {
    //     console.log("No user found with the ID")
    // } else
    // {
    //     console.log("User Updated Successfully")
    //     console.log(result)
    // }

    const result = await collectionTasks.updateMany(
        {
            completed: false
        },
        {
            $set: {
                completed: true
            }
        })

        if(result.matchedCount === 0)
        {
            console.log("Unable to find the completed")
        }else
        {
            console.log("Updated Successfully")
        }


    client.close(); // Close the connection when done.
} catch (error) {
    console.error('Unable to connect to database:', error);
}
}

connectToDatabase();