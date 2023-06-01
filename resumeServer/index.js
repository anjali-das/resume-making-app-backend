// code to create server using express

// import express
const express = require('express')

// import cors
const cors = require('cors')

// import logic file
const logic = require('./services/logic')

// import jsonwebtoken
const jwt = require('jsonwebtoken')

// create server using express
const server =express()

// use cors in server app
server.use(cors({
    origin:'http://localhost:4200'
}))

// use express.json
server.use(express.json())

// setup port for server
server.listen(3000,()=>{
console.log('Resume app started at  port number 3000');
})

const appMiddleware=(req,res,next)=>{
    console.log('app using middleware');
    next()
}
server.use(appMiddleware)

// middleware for verifying token to checkuser is logined or not
const jwtMiddleware = (req,res,next)=>{
    console.log('JWTMiddleware-router Specifier');
    
    // get token from req header
    const token = req.headers['verify-token']
    console.log(token);
    try{
        //verify token - verify()
        const data = jwt.verify(token,'secretkey123')
        console.log(data);
        // to get login account number
        req.currentusername = data.loginUsername
        
        // to process client request
        next()
       
    }catch{
       res.status(401).json({message:"Please login!!!!!"})
    }
}


// RESUME SERVER SIDE -request resolving


// register from client - post
server.post('/register',(req,res)=>{
    console.log('inside register api');
    console.log(req.body);
    
    // call register function of logic
    logic.register(req.body.username,req.body.email,req.body.password,req.body.confirmpassword)
    .then((result)=>{
    // response send to client
    res.status(result.statuscode).json(result)
    })
    
    })
   




//login
server.post('/login',(req,res)=>{
    console.log('Inside login api');
    console.log(req.body);
    
    //call login function of logic
    logic.login(req.body.username,req.body.password)
    .then((result)=>{
    //response send to client
    res.status(result.statuscode).json(result)
    })
    
    
    
    })

    // header-details
    server.post('/headerdetail',(req,res)=>{
        console.log('Inside headerdetail api');
        console.log(req.body);
        
        //call header-detail function of logic
        logic.headerdetail(req.body.firstname,req.body.lastname,req.body.city,req.body.country,req.body.pincode,req.body.phonenumber,req.body.email)
        .then((result)=>{
        //response send to client
        res.status(result.statuscode).json(result)
        })
    })

    server.get('/headerdetail',(req,res)=>{
        console.log('Inside headerdetail');
        console.log(req.body);
        logic.getDetails().then((result)=>{
            res.status(result.statuscode).json(result.result)
            console.log(result);
        })
    })

    // experience

    server.post('/experience',(req,res)=>{
        console.log('Inside experience api');
        console.log(req.body);
        
        //call experience function of logic
        logic.experience(req.body.jobtitle,req.body.employer,req.body.city,req.body.country,req.body.startdate,req.body.enddate)
        .then((result)=>{
        //response send to client
        res.status(result.statuscode).json(result)
        })
    })

    server.get('/experience',(req,res)=>{
        console.log('Inside experience');
        console.log(req.body);
        logic.getexperienceDetail().then((result)=>{
            res.status(result.statuscode).json(result.result)
            console.log(result);
        })
    })


    // education
    server.post('/education',(req,res)=>{
        console.log('Inside education api');
        console.log(req.body);

        // call education function of logic
        logic.education(req.body.schoolname,req.body.schoollocation,req.body.qualification,req.body.fieldofstudy,req.body.yearofgraduation)
        .then((result)=>{
            // response send to client
            res.status(result.statuscode).json(result)
        })
    })

    server.get('/education',(req,res)=>{
        console.log('Inside education');
        console.log(req.body);
        logic.geteducationDetails().then((result)=>{
            res.status(result.statuscode).json(result.result)
            console.log(result);
        })
    })


    // skill
    server.post('/skill',(req,res)=>{
        console.log('Inside skill api');
        console.log(req.body);

        // call education function of logic
        logic.skill(req.body.skill,req.body.summery,req.body.hobbies)
        .then((result)=>{
            // response send to client
            res.status(result.statuscode).json(result)
        })
    })
    server.get('/skill',jwtMiddleware,(req,res)=>{
        console.log('Inside skill');
        console.log(req.body);
        logic.getSkillDetail().then((result)=>{
            res.status(result.statuscode).json(result.result)
            console.log(result);
        })
    })

    //deleteMyAccount 
 server.delete('/delete-my-account',(req,res)=>{
    console.log('inside deleteMyAccount api');
    logic.deleteUserdetails(req.currentusername)
    .then((result)=>{
        //response send to client
        res.status(result.statuscode).json(result)
    })
 })

//  server.delete('/delete-UserExperince',(req,res)=>{
//     console.log('inside deleteMyAccount api');
//     logic.deletetUserexperience(req.currentusername)
//     .then((result)=>{
//         //response send to client
//         res.status(result.statuscode).json(result)
//     })
//  })

//  server.delete('/delete-UserEducation',(req,res)=>{
//     console.log('inside deleteMyAccount api');
//     logic.deletetUsereeducation(req.currentusername)
//     .then((result)=>{
//         //response send to client
//         res.status(result.statuscode).json(result)
//     })
//  })

//  server.delete('/delete-UserSkill',(req,res)=>{
//     console.log('inside deleteMyAccount api');
//     logic.deletetUsereeducation(req.currentusername)
//     .then((result)=>{
//         //response send to client
//         res.status(result.statuscode).json(result)
//     })
//  })