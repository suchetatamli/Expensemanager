const Sequelize = require('sequelize');
const Op = Sequelize.Op;
//const tokenHelper = require('../helpers/token');
const Models = require('../models');
const User = Models.User;
const Group = Models.Group;
const GroupMember = Models.GroupMember;
const Payment = Models.Payment;
const ShareMember = Models.ShareMember;

const UserController = { 
    /****** Search User ******/
    searchUser: async(req, res) => {
        let searchtext = req.params.searchtext;
        User.findAndCountAll({
            where: {"name": { [Op.like]: '%' + searchtext + '%'}}
        }).then((searchUserList) => {
            res.send({
                status: 'success',
                code: 'UC-SC-0001',
                data: searchUserList
            });
        }).catch((errors) => {
            res.send({
                status: 'error',
                code: 'UC-SC-0002',
                data: 'Error.'
            });
        });  
    },

    /*********** create group **********/
    createGroup: async(req, res) => {
        let formData = req.body;
        let insertData = {
            ...formData,
            group_name : formData.name,
            start_date : formData.startdate,
            created_by : formData.createdBy,
        }; 
        Group.insertGroup(insertData).then((groupData) => {
            res.send({
                status: 'success',
                code: 'UC-CG-0003',
                data: groupData
            });
        }).catch((errors) => {
            res.send({
                status: 'error',
                code: 'UC-CG-0004',
                data: 'Failed.'
            });
        });
    },

    /*********** Group List **********/
    groupList: async(req,res) => {
        let userId = req.params.userId;
        let orderByParam ='group_id';
        let order = 'DESC';
        
        var allPromise = [];
        GroupMember.findAndCountAll({where: {user_id:userId}, attributes:['group_id'],order:[[orderByParam,order]]}).then(response => {
            response.rows.forEach((el)=>{
                let promiseObj = Group.listGroup(el.group_id);

                // let promiseObj = new Promise((resolve, reject)=>{
                //     Group.listGroup(el.group_id).then((groupDetail)=>{
                //         resolve({
                //             groupData:groupDetail
                //         });
                //     })
                // });

                allPromise.push(promiseObj);
            });
            Promise.all(allPromise).then((responseData)=>{
                res.send({
                    status: 'success',
                    code: 'CAC-CD-0001',
                    data:responseData
                });
            }).catch((errors) => {
                res.send({
                    status: 'error',
                    code: 'UC-GL-0002',
                    data: 'Failed'
                });
            });
        });
    },

    /* Group details */
    groupDetails: async(req,res) => {
        let groupId = req.params.id;
        Group.groupDetail(groupId).then((groupDetails) => {
            res.send({
                status: 'success',
                code: 'UC-GD-0001',
                data: groupDetails
            });           
        }).catch((errors) => {
            //console.log(errors);
            res.send({
                status: 'error',
                code: 'UC-GD-0002',
                data: 'Some error occurred.'
            });
        });
    },

    /* Delete group */
    groupDelete: async(req,res) => {
        const groupId = req.params.id;

        const group = Group.destroy({where: {id: groupId}});
        const groupmember = GroupMember.destroy({where: {group_id: groupId}});

        Promise.all([group, groupmember]).then((groupDetail) => {
            res.send({
                status: 'Success',
                code: 'UC-GD-0003',
                data: groupDetail
            });
        }).catch((errors) => {
            //console.log(errors);
            res.send({
                status: 'error',
                code: 'UC-GD-0004',
                data: 'Some error occurred.'
            });
        });
    },

    /* delete group member */
    groupMemberDelete: async(req,res) => {
        const groupId = req.params.groupId; 
        const userId = req.params.userId; 

        GroupMember.destroy({where: {group_id: groupId, user_id: userId}}).then((groupMemberDetail) => {
            res.send({
                status: 'Success',
                code: 'UC-GMD-0001',
                data: groupMemberDetail
            });
        }).catch((errors) => {
            //console.log(errors);
            res.send({
                status: 'error',
                code: 'UC-GMD-0002',
                data: 'Some error occurred.'
            });
        });
    },

    /* add member */
    addMember: async(req, res) => {
        let formData = req.body;
        let insertData = {
            group_id : formData.group_id,
            user_id : formData.user.user_id,
            deposit : formData.user.deposit,
        }

        GroupMember.findAndCountAll({where: {group_id:formData.group_id, user_id: formData.user.user_id}}).then((response) => {
            if(response.count == 0){
                GroupMember.create(insertData).then((groupMemberData) => {
                    res.send({
                        status: 'success',
                        code: 'UC-AM-0001',
                        data: groupMemberData
                    });
                }).catch((errors) => {
                    res.send({
                        status: 'error',
                        code: 'UC-AM-0002',
                        data: 'Failed.'
                    });
                });
            } 
        }).catch((errors) => {
            res.send({
                status: 'error',
                code: 'UC-AM-0003',
                data: 'Some error occurred.'
            });
        });
    },

    /* add deposit amount */
    updateDepositAmount: async(req,res) => {
        let formData = req.body;
        let updateData = {
            deposit: (formData.deposit.old + formData.deposit.new)
        }
        GroupMember.update(updateData, {where: {user_id:formData.memberId, group_id:formData.groupId}}).then(response => {
            res.send({
                status: 'success',
                code: 'UC-UDA-0001',
                data: response
            });
        }).catch((errors) => {
            //console.log(errors);
            res.send({
                status: 'error',
                code: 'UC-UDA-0002',
                data: 'Some error occurred.'
            });
        });
    },

    /* save payment */
    savePayment: async(req,res) => {
        let formData = req.body;
        let insertPayment = {
            ...formData,
            group_id : formData.groupId,
            payby : formData.payBy,
            paydate : formData.payDate,
            description : formData.description,
            category : formData.category,
            amount : formData.amount,
            addedby : formData.addedBy,
            sharewith : formData.shareWith.toString(),
        };
        // console.log(insertPayment);
        const shareAmount = formData.amount / formData.shareWith.length;
        let payshare = null;
        const payment = Payment.insertPay(insertPayment);
        for(i=0;i<formData.shareWith.length; i++){
            this.payshare = GroupMember.update({pay_share :Sequelize.literal('pay_share + '+shareAmount)}, {where: {group_id:formData.groupId, user_id:formData.shareWith[i]}});
        }
        const groupmember = GroupMember.update({pay :Sequelize.literal('pay + '+formData.amount)}, {where: {group_id:formData.groupId, user_id:formData.payBy}});
        
        
        Promise.all([payment, payshare, groupmember]).then((response) => {
            res.send({
                status: 'success',
                code: 'UC-SP-0001',
                data: response
            });
        }).catch((errors) => {
            // console.log(errors);
            res.send({
                status: 'error',
                code: 'UC-SP-0002',
                data: 'Some error occurred.'
            });
        });
    },

    /* expense history */
    expenseHistory: async(req, res) => {
        let groupId = req.params.groupId;
        Group.groupExpenseDetail(groupId).then((groupExpenseDetails) => {
            res.send({
                status: 'success',
                code: 'UC-EH-0001',
                data: groupExpenseDetails
            });           
        }).catch((errors) => {
            // console.log(errors);
            res.send({
                status: 'error',
                code: 'UC-EH-0002',
                data: 'Some error occurred.'
            });
        });
    },

    /* delete group expense */
    groupExpenseDelete: async(req, res) => {
        const payId = req.params.paymentId;
        Payment.findOne({where: {id: payId}, attributes:['sharewith','amount','group_id','payby']}).then(response => {
            const groupId = response.group_id;
            const amount = response.amount;
            const totalSharePerson = response.sharewith.split(',');  //convert from string to array
            const shareAmount = amount / totalSharePerson.length;
            let payshare = null;
            for(i=0;i<totalSharePerson.length; i++){
                this.payshare = GroupMember.update({pay_share :Sequelize.literal('pay_share - '+shareAmount)}, {where: {group_id:groupId, user_id:totalSharePerson[i]}});
            }
            const groupmember = GroupMember.update({pay :Sequelize.literal('pay - '+amount)}, {where: {group_id:groupId, user_id:response.payby}});
            const shareMember = ShareMember.destroy({where: {payment_id:payId}});
            const paymentdetail = Payment.destroy({where: {id:payId}});

            
            Promise.all([payshare, groupmember, shareMember, paymentdetail]).then((deleteExpense) => {
                res.send({
                    status: 'success',
                    code: 'UC-GED-0001',
                    data: deleteExpense
                });
            }).catch((errors) => {
                res.send({
                    status: 'error',
                    code: 'UC-GED-0002',
                    data: 'Some error occurred when delete payment.'
                });
            });
        }).catch((errors) => {
            res.send({
                status: 'error',
                code: 'UC-GED-0003',
                data: 'Some error occurred when find this payment.'
            });
        });
    },

    /* edit payment */
    groupExpenseEdit: async(req, res) => {
        const paymentId = req.params.paymentId;
        Payment.paymentDetail(paymentId).then(response => {
            res.send({
                status: 'success',
                code: 'UC-0003',
                data: response
            });
        }).catch((errors) => {
            res.send({
                status: 'error',
                code: 'UC-GED-0003',
                data: 'Some error occurred when find this payment.'
            });
        });
    },

    /* update payment */
    updatePayment: async(req, res) => {
        const payId = req.params.paymentId;
        Payment.findOne({where: {id: payId}, attributes:['sharewith','amount','group_id','payby','addedby']}).then(response => {
            const addedBy = response.addedby;
            const groupId = response.group_id;
            const amount = response.amount;
            const totalSharePerson = response.sharewith.split(',');  //convert from string to array
            const shareAmount = amount / totalSharePerson.length;
            let payshare = null;
            for(i=0;i<totalSharePerson.length; i++){
                this.payshare = GroupMember.update({pay_share :Sequelize.literal('pay_share - '+shareAmount)}, {where: {group_id:groupId, user_id:totalSharePerson[i]}});
            }
            const groupmember = GroupMember.update({pay :Sequelize.literal('pay - '+amount)}, {where: {group_id:groupId, user_id:response.payby}});
            const shareMember = ShareMember.destroy({where: {payment_id:payId}});
            const paymentdetail = Payment.destroy({where: {id:payId}});

            let formData = req.body;
            let insertPayment = {
                ...formData,
                group_id : formData.groupId,
                payby : formData.payBy,
                paydate : formData.payDate,
                description : formData.description,
                category : formData.category,
                amount : formData.amount,
                addedby : addedBy,
                editby  : formData.editBy,
                sharewith : formData.shareWith.toString(),
            };
            const shareamount = formData.amount / formData.shareWith.length;
            let payshareamount = null;
            const payment = Payment.insertPay(insertPayment);
            for(i=0;i<formData.shareWith.length; i++){
                this.payshareamount = GroupMember.update({pay_share :Sequelize.literal('pay_share + '+shareamount)}, {where: {group_id:formData.groupId, user_id:formData.shareWith[i]}});
            }
            const groupmemberupdate = GroupMember.update({pay :Sequelize.literal('pay + '+formData.amount)}, {where: {group_id:formData.groupId, user_id:formData.payBy}});
            
            
            Promise.all([payshare, groupmember, shareMember, paymentdetail, payment, payshareamount, groupmemberupdate]).then((paymentDetail) => {
                res.send({
                    status: 'success',
                    code: 'UC-UP-0001',
                    data: paymentDetail
                });
            }).catch((errors) => {
                res.send({
                    status: 'error',
                    code: 'UC-UP-0002',
                    data: 'Some error occurred when update payment.'
                });
            });
        }).catch((errors) => {
            res.send({
                status: 'error',
                code: 'UC-UP-0003',
                data: 'Some error occurred when find this payment.'
            });
        });
    }
};

module.exports = UserController;