const express = require('express');
const bodyParser=require('body-parser');
const cors=require('cors');
const MongoClient = require('mongodb').MongoClient;
require('dotenv').config();

const app = express();
app.use(bodyParser.json());
app.use(cors());


const port =process.env.PORT || 2000;

app.get('/', (req, res) => {
  res.send('Hello World!')
})




const uri = `mongodb://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0-shard-00-00.w8vla.mongodb.net:27017,cluster0-shard-00-01.w8vla.mongodb.net:27017,cluster0-shard-00-02.w8vla.mongodb.net:27017/${process.env.DB_NAME}?ssl=true&replicaSet=atlas-kn5rpb-shard-0&authSource=admin&retryWrites=true&w=majority`;
MongoClient.connect(uri, { useUnifiedTopology: true }, function(err, client) {
  const collection = client.db("protfolio").collection("aziz");
  console.log("data base connected");


    app.post('/addReview',(req,res)=>{
        const review=req.body;
        collection.insertOne(review)
        .then(result=>{
            console.log(result);
            res.send(result.insertedCount>0)
        })
    })

    app.get("/showReview",(req,res)=>{
      collection.find({})
      .toArray((err,documents)=>{
        console.log(documents);
        res.send(documents);
      })
    })

});


app.listen(port);