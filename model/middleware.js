const jwt = require("jsonwebtoken");

module.exports.session = (request, response, next) => {
    let token = request.cookies.sessionJWT;
    if (token) {
        jwt.verify(token , process.env.SECRET , function (error , decode){
            console.log(decode);
            if (error) {
                response.send({
                    status : 400,
                    message : "Authentication failed (unable to authenticate access token)"
                })
            }
            else{
                request.decode = decode;
                next();
            }
        })
    } else{
        next();
    }
}