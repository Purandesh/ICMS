

const express=require('express');
const cors=require('cors');
const {MongoClient} = require ('mongodb')


//create a objective  for express
const app=new express();
 app.use(express.json());
  app.use(cors());

  
// res & respond
app.get('/home',(req,res)=>{
    res.send("home page");
  })
  //impementing mongodb database connectivity
  const client = new MongoClient('mongodb+srv://admin:admin@cluster0.mma86yy.mongodb.net/?retryWrites=true&w=majority')
  client.connect();
  const db = client.db('cvms');
  const col = db.collection('register');


  //insert post
  app.post('/insert',(req,res)=>{
    console.log(req.body);
    col.insertOne(req.body);
    res.send("successfully received");
  })



  
  // show all code
 
  app.get('/showall',async(req,res)=>{
    const result = await col.find().toArray();
    res.send(result);
})

app.post('/Delete',async(req,res)=>{
  const result1 = await col.findOne({'firstName':req.body.un})
  console.log(result1);
  if (result1.password == req.body.pw){
    col.deleteOne(result1);
    
     }
})

app.post('/Login',async(req,res)=>{
  const result2=await col.findOne({'firstName':req.body.un});
  console.log(result2);
  if (result2.password==req.body.pw){
      res.send(result2)
  }
      else{
      res.send("login failed")
  }
 
})
app.post('/update', async(req, res) => {
  console.log(req.body);
  const {un,pw,ro,em}=req.body;
  await col.updateOne({firstName:un},{
      $set:{
          password:pw,
          role:ro,
          email:em
      }
    }) 
    
})



  app.listen(8082);
  console.log("server Runnging");