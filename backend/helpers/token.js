let jsonwebtoken = require('jsonwebtoken');
let SHA512 = require("crypto-js/sha512");
const moment = require('moment');
module.exports = {
    createToken: function(user){
        var token =jsonwebtoken.sign(
            {
                data:{
                    id:user.id,
                    email:user.email,
                    date:moment().unix()
                },
            },
            process.env.APP,
            {
                expiresIn: '365d' 
            }
        );
        return token;
    },
    createGuestToken: function(){
        return SHA512(process.env.APP).toString();
    },
    generateToken: function(tokenText) {
        return SHA512(tokenText).toString();
    }
};