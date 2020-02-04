const express = require('express');
const router = express.Router();
require('express-group-routes');

const authMiddleware = require("../middlewares/auth");
const RegisterController = require('../controller/RegisterController');
const UserController = require('../controller/UserController');


// router.get('/api', CompanyController.index);
//router.post('/register', CompanyController.create);

// app.get('*', (req, res) => res.status(200).send({
// 	message: 'Welcome to the beginning of node.',
// }));

router.group('/api', function (router){
    router.post('/register', RegisterController.registration);
    router.post('/login', RegisterController.login);
    router.post('/logout', authMiddleware.sessionExpire);
    router.get('/search-user/:searchtext', UserController.searchUser);
    router.post('/create-group', UserController.createGroup);
    router.get('/group-list/:userId', UserController.groupList);
    router.get('/group-details/:id', UserController.groupDetails);
    router.get('/group-delete/:id', UserController.groupDelete);
    router.get('/group-member-delete/:groupId/:userId', UserController.groupMemberDelete);
    router.post('/add-member', UserController.addMember);
    router.post('/deposit-amount', UserController.updateDepositAmount);
    router.post('/save-payment', UserController.savePayment);
    router.get('/expense-history/:groupId', UserController.expenseHistory);
    router.get('/delete-group-expense/:paymentId', UserController.groupExpenseDelete);
    router.get('/edit-group-expense/:paymentId', UserController.groupExpenseEdit);
    router.post('/update-payment/:paymentId', UserController.updatePayment);
});


module.exports = router;
