// DATABASE CONNECTION WITH NODE

// Import mongoose in db.js
const mongoose = require('mongoose')

//Using mongoose, define connection between mongodb and express     
mongoose.connect('mongodb://localhost:27017/resume')

//Create a model/scheme/collection for storing data in db       
const User = mongoose.model('User',{
   
    username:String,
    email:String,
    password:String,
    confirmpassword:String,

    
})

const Userdetail = mongoose.model('Userdetail',{
    firstname:String,
    lastname:String,
    city:String,
    country:String,
    pincode:String,
    phonenumber:String,
    email:String
})

const Userexperience = mongoose.model('Userexperience',{
    jobtitle:String,
    employer:String,
    city:String,
    country:String,
    startdate:String,
    enddate:String
})

const Usereducation = mongoose.model('Usereducation',{
schoolname:String,
schoollocation:String,
qualification:String,
fieldofstudy:String,
yearofgraduation:String

})


const Userskill = mongoose.model('Userskill',{
    skill:String,
    summery:String,
    hobbies:String
   
    
    })
    

   

//export the collection
module.exports = {
    User,
    Userdetail,
    Userexperience,
    Usereducation,
    Userskill
}
