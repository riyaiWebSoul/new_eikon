const mongoose = require('mongoose');
const { Schema } = mongoose;

const aboutSchema = new Schema({
   
        title: String,
        description: String,
        descriptionSub1:String,
        descriptionSub2:String,
        descriptionSub3:String,
        DrTeamList:[{ Name: String,
                Post: String,
                description:String,
                image:String
        }],
name:String,
       
        

});

exports.about = mongoose.model('about', aboutSchema);
