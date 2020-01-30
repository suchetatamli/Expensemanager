const { Validator } = require('node-input-validator');
const md5 = require('md5');
const tokenHelper = require('../helpers/token');
//const SHA512 = require("crypto-js/sha512");
const Models = require('../models');
const User = Models.User;


const RegisterController = {
    /****** Registration ******/
    registration: async (req, res) => {
        let formData = req.body;
        var validation = new Validator(formData, {
            name: 'required',
            email: 'required|email',
            password: 'required|minLength:8',
        });
        const matched = await validation.check();

        if (!matched) {
            res.send({
                status: 'error',
                code: 'RC-Register-0001',
                data: validation.errors
            })
        } else {
            User.checkEmailExist(formData.email).then((existCount) => {
                if (existCount && existCount > 0) {
                    res.send({
                        status: 'error',
                        code: 'RC-Register-0002',
                        data: 'This Email already registered with us. Please provide another email.'
                    })
                } else {
                    let insertData = {
                        name : formData.name,
                        email : formData.email,
                        password : md5(formData.password)
                    }
                    new User(insertData).save().then((registrationData) => {
                        res.send({
                            status: 'success',
                            code: 'RC-Register-0003',
                            data: registrationData
                        });
                    }).catch((errors) => {
                        res.send({
                            status: 'error',
                            code: 'RC-Register-0004',
                            data: 'Registration Failed.'
                        });
                    });
                }
            });
        }
    },

    /******* Login **********/
    login: async( req, res ) => {
        let formData = req.body;
        query = {
            email: formData.email,
            password: md5(formData.password)
        }
        User.findOne({ where: query }).then((userData) => {
            let user = userData.toJSON();
            user['access_token'] = tokenHelper.createToken(user);
    
            res.send({
                status: 'success',
                code: 'RC-login-0001',
                data: {
                    message: 'Login successfull.',
                    user: user
                }
            });
        }).catch((errors) => {
            //console.log(errors);
            res.send({
                status: 'error',
                code: 'RC-login-0002',
                data: 'Login Failed.'
            });
        });
    }

};

module.exports = RegisterController;