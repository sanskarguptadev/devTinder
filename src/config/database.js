// const { MongoClient, ObjectId } = require("mongodb");

// const URL = "mongodb+srv://namastedev:Sahil%401995@namastenode.d3x6dz7.mongodb.net/?appName=NamasteNode"; // Connection String

// const client = new MongoClient(URL);

// const dbName = "HelloWorld";

// async function main() {
//     await client.connect();
//     const db = client.db(dbName);
//     const collection = db.collection('User');
//     //Create 
//     // const data = {
//     //     firstName: "Sneha",
//     //     lastName: "Jha",
//     //     city: "Bangalore",
//     //     phone: null,
//     // };

//     // const insertResult = await collection.insertMany([data]);
//     // console.log('Inserted documents =>', insertResult);

//     // Read
//     // const findResult = await collection.find({}).toArray();
//     // console.log('Found documents =>', findResult);

//     // Update
//     // const updateResult = await collection.updateOne({ _id: new ObjectId("6906ea6198855e07c3d40480") }, { $set: { firstName: "dolly" } });
//     // console.log('Updated documents =>', updateResult);

//     //Delete
//     // const deleteResult = await collection.deleteMany({ _id: new ObjectId("6906ea6198855e07c3d40480") });
//     // console.log('Deleted documents =>', deleteResult);

//     return "done"
// }

// main().then(console.log).catch(console.error).finally(() => client.close());

// /* 
//     Create free mo cluster
//     create user
//     get the connection string
//     install mongodb compass
// */

const mongoose = require("mongoose");

const connectDB = async() => {
    await mongoose.connect("mongodb+srv://namastedev:Sahil%401995@namastenode.d3x6dz7.mongodb.net/devTinder?appName=NamasteNode");
};

module.exports = connectDB;

