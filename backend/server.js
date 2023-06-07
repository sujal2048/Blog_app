const dotenv = require("dotenv").config();
const express=require('express');
const cors = require ("cors");
const connectDB = require("./config/connectDB")
const mongoose =require ("mongoose")

const authRoute = require("./routes/auth");
const userRoute = require("./routes/users");
const postRoute = require("./routes/posts");

const categoryRoute = require("./routes/categories");
const multer = require("multer");
const path = require("path");

const app = express();
app.use(cors());

const port=process.env.PORT || 5000

dotenv;
app.use(express.json());
app.use("/backend/images",express.static(path.join(__dirname,"/images")))


//mongo db
mongoose
   .connect(process.env.MONGO_URI)   //application will only run it is connected to db
   .then( () => {
    app.listen(port, () => {
        console.log(`Backend app listening on port ${port}`)
        })
    })
    .catch((err) => console.log(err));



//disk storage
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, "backend/images");
    },
    filename: (req, file, cb) => {
      cb(null, req.body.name);
    },
  });
  
  const upload = multer({ storage: storage });
  app.post("/api/upload", upload.single("file"), (req, res) => {
    res.status(200).json("File has been uploaded");
  });


//routes
app.use("/api/auth", authRoute);   
app.use("/api/users", userRoute);
app.use("/api/posts", postRoute);
app.use("/api/categories", categoryRoute);



//test


app.get('/hello', (req, res) => {
    res.send('Hello World!')
  })







