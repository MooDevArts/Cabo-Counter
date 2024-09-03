const mongoose = require("mongoose");

const gameSchema = new mongoose.Schema({
    // date:{
    //     type: Date,
    //     required: true
    // },
    himanshu:{
        type: Number,
        require: true
    },
    vaishnavi:{
        type: Number,
        require: true
    },
    kalyani:{
        type: Number,
        require: true
    }
}, { timestamps: true });

const gameModel = mongoose.model("Games", gameSchema);

const sessionSchema = new mongoose.Schema({
    himanshu:{
        type: Number,
        require: true
    },
    vaishnavi:{
        type: Number,
        require: true
    },
    kalyani:{
        type: Number,
        require: true
    }
});

const sessionModel = mongoose.model("Sessions", sessionSchema);

module.exports = {gameModel, sessionModel};