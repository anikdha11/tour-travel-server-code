const express = require('express');
const { MongoClient } = require('mongodb');
require('dotenv').config();
const cors = require('cors');
const objectId = require('mongodb').ObjectId;


const app = express();
const port = process.env.PORT || 5000;

//middleware
app.use(cors());
app.use(express.json());

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.gt16r.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

async function run() {

    try {
        await client.connect();
        const database = client.db('tour_detail');
        const packageCollection = database.collection('packages');
        //Get Api
        app.get('/packages', async (req, res) => {
            const cursor = packageCollection.find({});
            const packages = await cursor.toArray();
            res.send(packages);
        })
        //Get single package
        app.get('/packages/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: objectId(id) };
            const package = await packageCollection.findOne(query);
            res.json(package);

        })

    }


    finally {
        // await client.close();
    }


}
run().catch(console.dir);






app.get('/', (req, res) => {
    res.send('Tour server is running ohh okk ');
})

app.listen(port, () => {
    console.log('server is running at port', port);
})