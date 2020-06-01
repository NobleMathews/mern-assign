const express=require("express");

const router=express.Router();
var allowedin=0;
var globname="lostdata";
const updation =require("../models/user");

// router.get('/',(req,res)=>{
//     console.log(req.body);
//     updation.findOne({user_id:"noble"},{pswd:1,dob:1,_id:0})
//     .then((data)=>{
//         // console.log('Data: ',JSON.parse(data).pswd);
//         res.json(data);

//     })
//     .catch((error)=>{
//         console.log(error);

//     });
// });

router.post('/',(req,res)=>{
    var logger=req.body;
    updation.findOne({user_id:logger.name},{pswd:1,dob:1,_id:0})
    .then((data)=>{
        if(((data).pswd).localeCompare(logger.pass)==0){
        res.send("proceed");
        globname=logger.name;
        allowedin=1;
        }
        else{
            res.send("no");
            allowedin=0;
        }

    })
    .catch((error)=>{
        console.log(error);

    });

});

router.post('/update',(req,res)=>{
    if(allowedin=1)
    {
        var logger=req.body;
        var conditions = { user_id:globname}
            , update = { dob:logger.dob,pswd:logger.pass }
            , options = { multi: false };
        updation.update(conditions, update, options, callback);
        function callback (err, numAffected) {
            console.log(numAffected+" user's info updated in databse.")
        }
    }


});
module.exports =router;