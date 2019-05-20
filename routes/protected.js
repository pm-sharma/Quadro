const router = require("express").Router();
const parser = require("../model/imageUpload.js").parser;
const userProfile = require("../model/model.js").userProfile;


router.get("/private", (request, response) => {
    response.json({
        status : 200,
        message : "This is the page displayed after authentication"
    })
})

router.post('/imageUpload', parser.single("image"), (request, response) => {
    //let email = request.decode.email;
    userProfile.findOneAndUpdate({ EMAIL : request.decode.email},{$set:{ IMAGE_URL : request.file.url, IMAGE_ID : request.file.public_id }},{new:true})   
    .then((result)=>{
        if(result) {
            response.json({
                status : 200,
                message : "Profile pic was successfully updated"
                //send url as well of the updated image so that profile pic can get updated 
            })
        } else {
            response.json({
                status : 400,
                message : "There was authentication error while updating the profile pic"
            })
        }
    })
    .catch((error)=>{
        response.json({
            status : 500,
            message : "There was some server error while updating profile pic"
        })
    })

});


module.exports = router;