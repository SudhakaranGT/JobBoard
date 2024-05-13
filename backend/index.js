const express = require('express');
const cors = require('cors');
const { MongoClient, ObjectId } = require('mongodb');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@job-board.v2hid1x.mongodb.net`;

app.use(express.json());
app.use(cors());

// Define MongoDB client outside of the run function
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

async function connectToMongoDB() {
  try {
    await client.connect();
    console.log("Connected to MongoDB");

    // Define database and collection
    const db = client.db("job-board");
    const allJobs = db.collection("all-jobs");

    // getting all jobs
    app.get("/all-jobs", async (req, res) => {
      const jobs = await allJobs.find({}).toArray()
      res.send(jobs);
    });

    // posting a job
    app.post("/post-job", async (req, res) => {
      const body = req.body;
      body.createAt = new Date();
      console.log(body);
      const result = await allJobs.insertOne(body);
      if (result.insertedId) {
        return res.status(200).send(result);
      } else {
        return res.status(404).send({
          message: "Can't insert! try again later",
          status: false
        });
      }
    });

    // get jobs by email
    app.get("/myjobs/:title",async(req,res)=>{
      console.log(req.params.title)
      const job = await allJobs.find({companyName:req.params.title}).toArray()
      res.send(job)
    })
    
    app.delete("/job/:id",async(req,res)=>{
      const id = req.params.id;
      const filter = {_id:new ObjectId(id)}
      const result = await allJobs.deleteOne(filter);
      res.send(result)
    })

    // get jobs by if for update
    app.get("/all-jobs/:id",async(req,res)=>{
      const id = req.params.id;
      const job = await allJobs.findOne({_id:new ObjectId(id)}).toArray();
      res.send(job)

    })

    // update the jobs
    app.patch("/update-job/:id",async(req,res) => {
      const id = req.params.id;
      const jobData = req.body;
      const filter = {_id:new ObjectId(id)}
      const options = {upsert:true};
      const updateDoc = {
        $set: {
          ...jobData
        },
      };

      const result = await allJobs.updateOne(filter, updateDoc, options)
      res.send(result)
    })
    // Start the Express server after defining route handlers
    app.listen(port, () => {
      console.log(`App listening on port ${port}`);
    });
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
  }
}

// Call the function to connect to MongoDB
connectToMongoDB();
