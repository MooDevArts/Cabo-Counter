const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const gameModel = require("./model").gameModel;
const sessionModel = require("./model").sessionModel;
dotenv.config();
app.use(express.json());
const cors = require('cors');
app.use(cors());

mongoose
  .connect(process.env.URI)
  .then(() => {
    console.log("Connected Successfully");
    app.listen(process.env.PORT || 5000, (err) => {
      if (err) console.log(err);
      console.log(`running at port ${process.env.PORT}`);
    });
  })
  .catch((error) => console.log("Failed to connect", error));

//APIs
app.get("/", async (req, res) => {
    const games = await gameModel.find();
    res.status(200).json(games);
});

app.post('/', async (req, res) => {
    console.log(req.body);
    const {himanshu, vaishnavi, kalyani} = req.body;
    await gameModel.create({
        himanshu: himanshu,
        vaishnavi: vaishnavi,
        kalyani: kalyani
    });
    res.send("created")
});

app.delete('/:id', async (req, res) => {
    const {id} = req.params;    
    await gameModel.findByIdAndDelete({_id:id});
    res.send("deleted")
})

app.get('/record-session/:name', async (req, res) => {
  const sessions = await sessionModel.find();
  const name = req.params.name;
  const updatedSession = await sessionModel.findOneAndUpdate(
    {}, 
    { $inc: { [name]: 1 } }, 
    { new: true } 
  );
  await gameModel.deleteMany({});
  res.send('recorded');
});

app.get("/sessions", async (req, res) => {
  const sessions = await sessionModel.find();
  res.status(200).json(sessions);
});