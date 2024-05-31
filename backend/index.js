const express = require('express');
const cors = require('cors');
const { MongoClient, ObjectId } = require('mongodb');
const multer = require('multer');
const path = require('path');
require('dotenv').config();
const fs = require('fs');
const axios = require('axios');
const FormData = require('form-data');

const app = express();
const port = process.env.PORT || 3000;
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@job-board.v2hid1x.mongodb.net`;

app.use(express.json());
app.use(cors());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));


// Define MongoDB client outside of the run function
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

async function connectToMongoDB() {
  try {
    await client.connect();
    console.log("Connected to MongoDB");

    // Define database and collection
    const db = client.db("job-board");
    const allJobs = db.collection("all-jobs");
    const allUsers = db.collection("all-users");
    const allApplicants = db.collection("all-applicants");

    // Multer configuration for file uploads
    const storage = multer.diskStorage({
      destination: (req, file, cb) => {
        cb(null, 'uploads/');
      },
      filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
      }
    });
    
    const upload = multer({ storage: storage });

    // app.post('/upload-resume1', upload.single('resume'), async (req, res) => {
    //   // Extract data from request
    //   const { username, email, jobId } = req.body;
    //   const resume = req.file.path; 
    
      
    //   const preferredJobs = [
    //     'Data Science', 'Web Designing',
    //     'Python Developer',
    //      'Database',
    //      'Testing','Web Developer',
    //   ];
    
    //   // Select a random preferred job
    //   const preferredJob = preferredJobs[Math.floor(Math.random() * preferredJobs.length)];
    
    //   // Generate a random rank between 80 and 100
    //   const rank = Math.floor(Math.random() * 21) + 80;
       
    //   try {
    //     // Create a new applicant object
    //     const newApplicant = {
    //       username,
    //       email,
    //       preferredJob,
    //       rank,
    //       resume,
    //       jobId: new ObjectId(jobId),
    //       appliedAt: new Date()
    //     };
    
    //     // Insert the applicant into the database
    //     const result = await allApplicants.insertOne(newApplicant);
    
    //     if (result.insertedId) {
    //       res.status(200).json({ message: 'Resume uploaded and application saved', status: true });
    //     } else {
    //       res.status(500).json({ message: "Failed to save application, try again later", status: false });
    //     }
    //   } catch (error) {
    //     console.error('Error saving application:', error);
    //     res.status(500).json({ message: 'Server error', error });
    //   }
    // });

    app.post('/upload-resume', upload.single('resume'), async (req, res) => {
      const { username, email, jobId } = req.body;
      const resumePath = req.file.path;
    
      try {
        const formData = new FormData();
        formData.append('resume', fs.createReadStream(resumePath));
    
        const response = await axios.post('http://localhost:5000/predict-job', formData, {
          headers: {
            ...formData.getHeaders()
          }
        });
    
        const { predicted_category_1, predicted_category_2 } = response.data;
        const preferredJob = `${predicted_category_1}, ${predicted_category_2}`;
    
        const newApplicant = {
          username,
          email,
          preferredJob,
          rank: Math.floor(Math.random() * 21) + 80, // Generate a random rank between 80 and 100
          resume: resumePath,
          jobId: new ObjectId(jobId),
          appliedAt: new Date()
        };
    
        const result = await allApplicants.insertOne(newApplicant);
    
        if (result.insertedId) {
          res.status(200).json({ message: 'Resume uploaded, job predicted and application saved', status: true });
        } else {
          res.status(500).json({ message: "Failed to save application, try again later", status: false });
        }
      } catch (error) {
        console.error('Error predicting job category:', error);
        res.status(500).json({ success: false, error: error.message });
      }
    });
    

    app.get("/all-jobs", async (req, res) => {
      const jobs = await allJobs.find({}).toArray()
      res.send(jobs);
    });

    app.get("/all-users", async (req, res) => {
      const users = await allUsers.find({}).toArray()
      res.send(users);
    });

    app.get("/all-apply", async (req, res) => {
      const applicants = await allApplicants.find({}).toArray()
      res.send(applicants);
    });

    app.post("/post-signup1", async (req, res) => {
      try {
        const body = req.body;
        const existingUser = await allUsers.findOne({ email: body.email });
        
        if (existingUser) {
          return res.status(400).send({
            message: "Email already exists!",
            status: false
          });
        }
    
        body.createAt = new Date();
        body.type = "seeker";

        const result = await allUsers.insertOne(body);
        
        if (result.insertedId) {
          return res.status(200).send(result);
        } else {
          return res.status(500).send({
            message: "Can't insert! Try again later.",
            status: false
          });
        }
      } catch (error) {
        console.error(error);
        return res.status(500).send({
          message: "Internal server error",
          status: false
        });
      }
    });
    
    app.post("/post-signup2", async (req, res) => {
      try {
        const body = req.body;
        const existingUser = await allUsers.findOne({ email: body.email });
    
        if (existingUser) {
          return res.status(400).send({
            message: "Email already exists!",
            status: false
          });
        }
    
        body.createAt = new Date();
        body.type = "recruiter";
        const result = await allUsers.insertOne(body);
        
        if (result.insertedId) {
          return res.status(200).send(result);
        } else {
          return res.status(500).send({
            message: "Can't insert! Try again later.",
            status: false
          });
        }
      } catch (error) {
        console.error(error);
        return res.status(500).send({
          message: "Internal server error",
          status: false
        });
      }
    });
    
    app.get("/user-login", async (req, res) => {
      const { email, password} = req.query;
    
      try {
        const user = await allUsers.findOne({ email, type: "seeker" });
        if (user && user.password === password) { 
          return res.status(200).send({
            message: "Login successful",
            status: true,
            user
          });
        } else {
          return res.status(401).send({
            message: "Invalid credentials",
            status: false
          });
        }
      } catch (error) {
        return res.status(500).send({
          message: "Internal Server Error",
          status: false
        });
      }
    });


    app.get("/company-login", async (req, res) => {
      const { email, password, company } = req.query;
    
      try {
        const user = await allUsers.findOne({ email, type: "recruiter" })
        if (user && user.password === password) { 
          return res.status(200).send({
            message: "Login successful",
            status: true,
            user
          });
        } else {
          return res.status(401).send({
            message: "Invalid credentials",
            status: false
          });
        }
      } catch (error) {
        return res.status(500).send({
          message: "Internal Server Error",
          status: false
        });
      }
    });
    
    app.post("/post-job", async (req, res) => {
      const body = req.body;
      body.createAt = new Date();
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
    app.get("/all-jobs/:email", async (req, res) => {
      const email = req.params.email;
      const jobs = await allJobs.find({ postedBy: email }).toArray();
      res.send(jobs)
    })

    app.get("/editjob/:id", async (req, res) => {
      const id = req.params.id;
      try {
        const job = await allJobs.findOne({ _id: new ObjectId(id) });
        if (!job) {
          return res.status(404).send({ error: "Job not found" });
        }
        res.send(job);
      } catch (error) {
        console.error("Error fetching job:", error);
        res.status(500).send({ error: "Internal Server Error" });
      }
    });
    
    app.delete("/job/:id", async (req, res) => {
      const id = req.params.id;
      const filter = { _id: new ObjectId(id) }
      const result = await allJobs.deleteOne(filter);
      res.send(result)
    })

    app.get("/job/:id", async (req, res) => {
      try {
        const id = req.params.id;
        const filter = { _id: new ObjectId(id) };
        const result = await allJobs.findOne(filter);
        if (result) {
          res.status(200).send(result);
        } else {
          res.status(404).send({ message: "Job not found" });
        }
      } catch (error) {
        console.error(error);
        res.status(500).send({ message: "Internal server error" });
      }
    });

    // update the jobs
    app.patch("/update-job/:id", async (req, res) => {
      try {
        const id = req.params.id;
        const jobData = req.body;
    
        // Remove the _id field from the jobData to prevent updating it
        delete jobData._id;
    
        const filter = { _id: new ObjectId(id) };
        const updateDoc = {
          $set: jobData // Use jobData directly without spreading
        };
    
        const result = await allJobs.updateOne(filter, updateDoc);
        res.send(result);
      } catch (error) {
        console.error("Error updating job:", error);
        res.status(500).send("Internal Server Error");
      }
    });
    
    

    app.get('/user/:id', async (req, res) => {
      const id = req.params.id;
      const user = await allUsers.findOne({ _id: new ObjectId(id) });
      if (user) {
        res.send(user);
      } else {
        res.status(404).send({ message: 'User not found' });
      }
    });
    
    app.get('/all-apply/:id', async (req, res) => {
      const id = req.params.id.toString();
      console.log(id);
      const applicants = await allApplicants.find({ jobId: new ObjectId(id) }).toArray();
      res.send(applicants);
    });
    


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

