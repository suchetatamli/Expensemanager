const Sequelize = require('sequelize');
const Op = Sequelize.Op;
const tokenHelper = require('../helpers/token');
const Models = require('../models');
const User = Models.User;
const Group = Models.Group;
const GroupMember = Models.GroupMember;
const Payment = Models.Payment;

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
        }; console.log(insertData);
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
        let formData = req.body;
        let orderByParam ='id';
        let order = 'DESC';
        if(formData.orderByParam){
            orderByParam = formData.orderByParam;
        }
        if(formData.order){
            order = formData.order;
        }
        Group.listGroup(orderByParam,order).then((groupList) => {
            res.send({
                status: 'success',
                code: 'UC-GL-0001',
                data: groupList
            });           
        }).catch((errors) => {
            res.send({
                status: 'error',
                code: 'UC-GL-0002',
                data: 'Failed'
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
            sharewith : formData.shareMembers.toString(),
        };
        const shareAmount = formData.amount / formData.shareMembers.length;
        let payshare = null;
        const payment = Payment.insertPay(insertPayment);
        for(i=0;i<formData.shareMembers.length; i++){
            this.payshare = GroupMember.update({pay_share :Sequelize.literal('pay_share + '+shareAmount)}, {where: {group_id:formData.groupId, user_id:formData.shareMembers[i]}});
        }
        const groupmember = GroupMember.update({pay :Sequelize.literal('pay + '+formData.amount)}, {where: {group_id:formData.groupId, user_id:formData.payBy}});
        
        
        Promise.all([payment, payshare, groupmember]).then((response) => {
            res.send({
                status: 'success',
                code: 'UC-SP-0001',
                data: response
            });
        }).catch((errors) => {
            console.log(errors);
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
            console.log(errors);
            res.send({
                status: 'error',
                code: 'UC-EH-0002',
                data: 'Some error occurred.'
            });
        });
    }
};

module.exports = UserController;