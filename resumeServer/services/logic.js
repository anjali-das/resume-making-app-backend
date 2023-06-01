// import db.js
const db = require('./db')

// import jsonwebtoken 
const jwt = require('jsonwebtoken')


// register
const register = (username, email, password, confirmpassword) => {

    //logic to resolve register(username,email,password,confirmpassword)
    console.log('Inside register logic ');

    // check email in db - findOne() - asynchronous function : promise
    return db.User.findOne({
        email
    }).then((response) => {
        console.log(response);
        if (response) {
            // if email already exist
            return {
                statuscode: 401,
                message: "Account already exist...."
            }
        }
        else {
            // email is not present in db,so register it
            const newUser = new db.User({
                username,
                email,
                password,
                confirmpassword
            })
            // to store newUser in mongodb
            newUser.save()
            // send response as register success
            return {
                statuscode: 200,
                message: "Register successfully...."
            }
        }
    })
}




// login logic
const login = (username, password) => {
    console.log('Inside login logic');
    //1. check username and password is in db
    return db.User.findOne({
        username,
        password,

    }).then((result) => {
        if (result) {
            // acno is present db 

            // generate token with payload as username
            const token = jwt.sign({
               loginUsername:username
            },'secretkey123')
            return {
                statuscode: 200,
                message: "Login Successful.....",

                // send token to client
                token,
                currentUsername:result.username

            }
        }
        else {
            //             // acno is not present db
            return {
                statuscode: 404,
                message: "Invalid Account username / Password"
            }
        }
    })
}


// headerdetail
const headerdetail = (firstname, lastname, city, country, pincode, phonenumber, email) => {

    //logic to resolve register(username,email,password,confirmpassword)
    console.log('Inside hederdetail logic ');

    // check email in db - findOne() - asynchronous function : promise
    return db.Userdetail.findOne({
        email
    }).then((response) => {
        console.log(response);
        if (response) {
            // if email already exist
            return {
                statuscode: 401,
                message: "Details already exist...."
            }
        }
        else {
            // email is not present in db,so register it
            const newUserdetail = new db.Userdetail({
                firstname,
                lastname,
                city,
                country,
                pincode,
                phonenumber,
                email
            })
            // to store newUser in mongodb
            newUserdetail.save()
            // send response as register success
            return {
                statuscode: 200,
                message: "Data Entered successfully...."
            }
        }
    })
}

// get header details history
const getDetails = ()=>{
    return db.Userdetail.find()
     .then((result)=>{
    if(result){
     return{
         statuscode:200,
         result:result
     }
    }
   
    })
 }



// experience
const experience = (jobtitle, employer, city, country, startdate, enddate) => {

    //logic to resolve register(username,email,password,confirmpassword)
    console.log('Inside experience logic ');

    // check employer in db - findOne() - asynchronous function : promise
    return db.Userexperience.findOne({
        employer
    }).then((response) => {
        console.log(response);
        if (response) {
            // if employer already exist
            return {
                statuscode: 401,
                message: "Detaills already exist...."
            }
        }
        else {
            // employer is not present in db,so register it
            const newUserexperience = new db.Userexperience({
                jobtitle,
                employer,
                city,
                country,
                startdate,
                enddate
            })
            // to store newUser in mongodb
            newUserexperience.save()
            // send response as success
            return {
                statuscode: 200,
                message: "Data Entered successfully...."
            }
        }
    })
}

// get experience history
const getexperienceDetail = ()=>{
    return db.Userexperience.find()
     .then((result)=>{
    if(result){
     return{
         statuscode:200,
         result:result
     }
    }
   
    })
 }



// education
const education = (schoolname,schoollocation,qualification,fieldofstudy,yearofgraduation) => {

    //logic to resolve register(username,email,password,confirmpassword)
    console.log('Inside education logic ');

    // check employer in db - findOne() - asynchronous function : promise
    return db.Usereducation.findOne({
        fieldofstudy
    }).then((response) => {
        console.log(response);
        if (response) {
            // if education data already exist
            return {
                statuscode: 401,
                message: "Detaills already exist...."
            }
        }
        else {
            // education data is not present in db,so enter it
            const newUsereducation = new db.Usereducation({
                schoolname,
                schoollocation,
                qualification,
                fieldofstudy,
                yearofgraduation
            })
            // to store newUser in mongodb
            newUsereducation.save()
            // send response as education success
            return {
                statuscode: 200,
                message: "Data Entered successfully...."
            }
        }
    })
}
// get education details history
const geteducationDetails = ()=>{
    return db.Usereducation.find()
     .then((result)=>{
    if(result){
     return{
         statuscode:200,
         result:result
     }
    }
   
    })
 }




// skill
const skill = (skill,summery,hobbies) => {

    //logic to resolve register(username,email,password,confirmpassword)
    console.log('Inside skill logic ');

    // check summery in db - findOne() - asynchronous function : promise
    return db.Userskill.findOne({
        summery
    }).then((response) => {
        console.log(response);
        if (response) {
            // if education data already exist
            return {
                statuscode: 401,
                message: "Detaills already exist...."
            }
        }
        else {
            // education data is not present in db,so enter it
            const newUserskill = new db.Userskill({
                skill,
                summery,
                hobbies
            })
            // to store newUser in mongodb
            newUserskill.save()
            // send response as education success
            return {
                statuscode: 200,
                message: "Data Entered successfully...."
            }
        }
    })
}

 // get skill history
 const getSkillDetail = ()=>{
    return db.Userskill.find()
     .then((result)=>{
    if(result){
     return{
         statuscode:200,
         result:result
     }
    }
   
    })
 }

 ///deletemy account
 const deleteUserdetails = (userdelete)=>{
    //adminacnt delete from mongo db
    return db.Userdetail.deleteOne({userdelete})
    .then((result)=>{
        return{
            statuscode:200,
            message:"Your details are removing ...Please wait while we are deleting your data"
        }
    })
}

///deletemy account
const deletetUserexperience = (userdelete)=>{
    //adminacnt delete from mongo db
    return db.Userexperience.deleteOne({userdelete})
    .then((result)=>{
        return{
            statuscode:200,
            message:"Your details are removing ...Please wait while we are deleting your data"
        }
    })
}
 
const deletetUsereeducation = (userdelete)=>{
    //adminacnt delete from mongo db
    return db.Usereducation.deleteOne({userdelete})
    .then((result)=>{
        return{
            statuscode:200,
            message:"Your details are removing ...Please wait while we are deleting your data"
        }
    })
}

const deletetUsereskill = (userdelete)=>{
    //adminacnt delete from mongo db
    return db.Userskill.deleteOne({userdelete})
    .then((result)=>{
        return{
            statuscode:200,
            message:"Your details are removing ...Please wait while we are deleting your data"
        }
    })
}
 



// // export
module.exports = {
    register,
    login,
    headerdetail,
    experience,
    education,
    skill,
    getDetails,
    getSkillDetail,
    getexperienceDetail,
    geteducationDetails,
    deleteUserdetails,
    deletetUserexperience,
    deletetUsereeducation,
    deletetUsereskill

}
