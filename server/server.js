if (process.env.NODE_ENV != "production"){
    require("dotenv").config();
}

const express = require("express");
const cors = require("cors");
const connectDB= require("./config/connectDB");
const musicController =  require("./controllers/musicController");

const app = express();

app.use(express.json());
app.use(cors());

connectDB();

app.get("/", musicController.fetch_music);

app.get("/music/:id", musicController.fetch_music_by_id);

app.post("/music", musicController.create_new_music);

app.put("/music/:id", musicController.update_music);

app.delete("/music/:id", musicController.delete_music);
 
app.listen(process.env.PORT);

