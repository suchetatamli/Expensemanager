const jsonwebtoken = require('jsonwebtoken');
const SHA512 = require("crypto-js/sha512");
const Promise = require("bluebird");

const AuthMiddleware = {
    /* Function Name : authenticated
    * Author : 
    * Created Date : 
    * Modified Date : *
    * Purpose : to authenticate token
    */
    authenticated: function (req, res, next) {
    var token = req.body.token || req.params.token || req.query._token || req.headers['x-access-token'];
    if (token) {
        jsonwebtoken.verify(token, process.env.APP, function (err, decoded) {
            if (err) {
                if (SHA512(process.env.APP) == token) {
                    next();
                } else {
                    res.status(200).send({
                    message: '!Oops failed to authenticate token.',
                    status: 'error',
                    data: {},
                    apicode: 'AUTH-1001',
                    });
                }
            } else {
                req.decoded = decoded;
                res.status(200).send({
                    message: 'loggedIn',
                    status: 'success',
                    data: {},
                    apicode: 'AUTH-1002',
                });
                // next();
            }
        });
        } else {
            res.status(200).send({
                message: '!Oops no token provided.',
                status: 'error',
                data: {},
                apicode: 'AUTH-1003',
                error_code: ''
            });
        }
    },
    /* Function Name : sessionAuth
    * Author : 
    * Created Date : 
    * Modified Date : *
    * Purpose : to check session auth token
    */
    sessionAuth: function (req, res, next) {
        var token = req.body.token || req.params.token || req.query._token || req.headers['x-access-token'];
        let userId = "0";
        if (req.body._u) {
            userId = Buffer.from(req.body._u, 'base64').toString('ascii');
        }
        if (token) {
            jsonwebtoken.verify(token, process.env.APP, function (err, decoded) {
                if (err) {
                    res.status(200).send({
                        message: '!Oops failed to authenticat token.',
                        status: 'logout',
                        data: {},
                        apicode: 'SESS-1003',
                        error_code: ''
                    });
                } else {
                    if (decoded.data.id != undefined && decoded.data.id == userId) {
                        req.decoded = decoded;

                        Promise.all([
                        global.callbacks.UserCallback.updateLastActiveTime(userId)
                        ]).then((update) => {});

                        next();
                    } else {
                        res.status(200).send({
                        message: '!Oops your login session has been expire.',
                        status: 'logout',
                        data: {},
                        apicode: 'SESS-1002',
                        error_code: ''
                        });
                    }
                }
            });
        } else {
            res.status(200).send({
                message: '!Oops no token provided.',
                status: 'logout',
                data: {},
                apicode: 'SESS-1001',
                error_code: ''
            });
        }
    },

    /* Function Name : sessionExpire
    * Author : 
    * Created Date : 
    * Modified Date : *
    * Purpose : to expire the session auth token 
    */
    sessionExpire: function (req, res, next) {
        var token = req.body.token || req.params.token || req.query._token || req.headers['x-access-token'];
        let userId = "0";
        if (req.body._u) {
        userId = Buffer.from(req.body._u, 'base64').toString('ascii');
        }
        if (token) {
            jsonwebtoken.verify(token, process.env.APP, function (err, decoded) {
                if (err) {
                    res.status(200).send({
                        message: '!Oops failed to authenticat token.',
                        status: 'logout',
                        data: {},
                        apicode: 'SES-OUT-1003',
                        error_code: ''
                    });
                } else {
                    if (decoded.data.id != undefined && decoded.data.id == userId) {

                        res.status(200).send({
                        message: 'logout successfully',
                        status: 'success',
                        data: {},
                        apicode: 'SES-OUT-1003',
                        error_code: ''
                        });
                    } else {
                        res.status(200).send({
                        message: '!Oops your login session has been expire.',
                        status: 'logout',
                        data: {},
                        apicode: 'SES-OUT-1002',
                        error_code: ''
                        });
                    }
                }
            });
        } else {
            res.status(200).send({
                message: '!Oops no token provided.',
                status: 'logout',
                data: {},
                apicode: 'SES-OUT-1001',
                error_code: ''
            });
        }
    },
};
module.exports = AuthMiddleware;