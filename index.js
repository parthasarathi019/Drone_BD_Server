const express = require('express')
const app = express()

var cors = require('cors')
// var jwt = require('jsonwebtoken')
app.use(cors())
require('dotenv').config();

app.use(express.json())
const port = process.env.PORT || 9000
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');


//mongomongomongomongomongomongomongomongomongomongomongomongomongomongomongomongomongomongomongomongomongomongomongmongomongomongomongomongo
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.by31wed.mongodb.net/?retryWrites=true&w=majority`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    const database = client.db("Drone_Database");
    const Drone_Database_All_Data = database.collection("Drone_Database_All_Data"); //database collection 1
//|||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||
app.post('/drones', async (req, res) => {  //<<<<<<==== send data to database<<<<<<<<<<<<<<
    const drone = req.body;
    console.log(drone);
    const result = await Drone_Database_All_Data.insertOne(drone);                                       //All Drone Data 𝐏𝐎𝐒𝐓 to database
    res.send(result)
  })
  
//|||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||
//|||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||
app.get('/drones', async (req, res) => {   //>>>>------get data from database>>>>>>>>>>>>>>>>
    const cursor = Drone_Database_All_Data.find();
    const result = await cursor.toArray()                                                                //𝐆𝐄𝐓 All Drone data from db
    res.send(result)
  })
//|||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||
//|||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||
  app.get('/mydrones',async(req,res)=>{
    let query = {}
    if(req.query?.email){
      query = {updare_seller_email: req.query?.email }                                                  //𝐆𝐄𝐓 specific Drone data by using email
    }
    const options = {
      sort: {price:1}
    }
    const result = await Drone_Database_All_Data.find(query,options).toArray()
    res.send(result);
  })

//||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||
//||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||
app.get('/dji', async (req, res) => {   //>>>>------get dji data from database>>>>>>>>>>>>>>>>
  const query = {select: "DJI" }
  const cursor = Drone_Database_All_Data.find(query);
  const result = await cursor.toArray()                                                                //𝐆𝐄𝐓 Tab_1_dji data from db
  res.send(result)
})
//||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||
//||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||
app.get('/searchText/:text',async(req,res)=>{
  const body = req.params.text;
  const result = await Drone_Database_All_Data.find({
    $or: [
      {name: {$regex: body, $options: "i"}}                                                          //Search System
    ]
  }).toArray()
  res.send(result)
})
//||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||
//||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||
app.get('/parrot', async (req, res) => {   //>>>>------get Parrot data from database>>>>>>>>>>>>>>>>
  const query = {select: "Parrot" }
  const cursor = Drone_Database_All_Data.find(query);
  const result = await cursor.toArray()                                                                //𝐆𝐄𝐓 Tab_1_dji data from db
  res.send(result)
})
//||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||
//||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||
app.get('/skydio', async (req, res) => {   //>>>>------get Skydio data from database>>>>>>>>>>>>>>>>
  const query = {select: "Skydio" }
  const cursor = Drone_Database_All_Data.find(query);
  const result = await cursor.toArray()                                                                //𝐆𝐄𝐓 Tab_1_dji data from db
  res.send(result)
})
//||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||
//||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||
app.get('/xag', async (req, res) => {   //>>>>------get XAG data from database>>>>>>>>>>>>>>>>
  const query = {select: "XAG" }
  const cursor = Drone_Database_All_Data.find(query);
  const result = await cursor.toArray()                                                                //𝐆𝐄𝐓 Tab_1_dji data from db
  res.send(result)
})
//||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||
//||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||
app.delete('/drones/:id', async (req, res) => {  //xxxx==== delete data from database xxxxxxx
    const id = req.params.id
    console.log("deleting id", id);
    const query = { _id: new ObjectId(id) };                                                             //𝐃𝐄𝐋𝐄𝐓𝐄
    const  Drone = await Drone_Database_All_Data.deleteOne(query);       
    res.send( Drone)
  })
  //|||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||
  //|||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||
  app.put('/drones/:id', async (req, res) => {
    const id = req.params.id
    const update_drone = req.body;
    //https://www.mongodb.com/docs/drivers/node/current/usage-examples/updateOne/
    const filter = { _id: new ObjectId(id) };                                            
    const options = { upsert: true };
    const update_drone_Doc = {
      $set: {
        name: update_drone.name,
        price: update_drone.price,
        category: update_drone.category,
        select:update_drone.select,
        seller_same:update_drone.seller_same , 
        updare_rating:update_drone.updare_rating , 
        updare_quantity:update_drone.updare_quantity , 
        updare_description:update_drone.updare_description , 
        updare_seller_email:update_drone.updare_seller_email , 
        photo:update_drone.photo
      },
    };
    const result = await Drone_Database_All_Data.updateOne(filter, update_drone_Doc, options);
    res.send(result)
    // console.log('clear', update_user);
  })
  //|||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||
  //|||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||
  app.get('/drones/:id', async (req, res) => { 
    const id = req.params.id
    const query = { _id: new ObjectId(id) };
    const result = await Drone_Database_All_Data.findOne(query);
    res.send(result)

  })
  //|||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||

    // await client.connect();
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);

// //mongomongomongomongomongomongomongomongomongomongomongomongomongomongomongomongomongomongomongomongomongomongomongmongomongomongomongomongo


app.get('/', (req, res) => {
  res.send('Drone Bd is running')
})


app.listen(port, () => {
  console.log(`Drone Bd is running on port ${port}`)
})

//http://localhost:9000/mydrones?email=djicorp@gmail.com
//