

const { MongoClient } = require('mongodb');
const express = require('express');
const app = express();
const port = process.env.PORT || 5000;
require('dotenv').config();
const cors = require('cors');

//middleware
app.use(cors());
app.use(express.json());

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.gt16r.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

async function run(){

    try{
        await client.connect();
        const database = client.db('tourDetails');
        const usersCollection = database.collection('details');
        //GET API
        app.get('/details',async (req,res)=>{
            res.send('details')
        })
    }


finally{
    await client.close();
}


}
run().catch(console.dir);






app.get('/',(req,res)=>{
    res.send('Tour server is running ');
})

app.listen(port,()=>{
    console.log('server is running at port',port);
})