'use strict';
module.exports = (sequelize, DataTypes) => {
  const Group = sequelize.define('Group', {
    id: {
      type:DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
      field: 'id'
    },
    group_name: {
      type:DataTypes.STRING,
      allowNull:false,
      field: 'group_name'
    },
    created_by: {
      type:DataTypes.INTEGER,
      allowNull:false,
      field: 'created_by'
    },
    start_date: {
      type:DataTypes.DATE,
      allowNull:true,
      field: 'start_date'
    },
    created_at: {
      type: DataTypes.DATE,
      allowNull: true,
      field: 'created_at'
    },
    updated_at: {
        type: DataTypes.DATE,
        allowNull: true,
        field: 'updated_at'
    }
  }, {
    tableName : 'groups',
    underscored: true,
  });
  Group.associate = function(models) {
    // associations can be defined here
    Group.hasMany(models.GroupMember, {
      as : 'members', 
      foreignKey : 'group_id'
    });
    Group.hasMany(models.Payment, {
      as : 'pay',
      foreignKey : 'group_id'
    })
  };

  /****** insert group and group member detail ******/
  Group.insertGroup = function (data){
    //console.log(data);
    return Group.create(data,{
      include: [ {
          association: 'members',
        }
      ]
    });
  },

  /***************** group list  ****************/
  Group.listGroup = function(groupId){
    return this.findOne({
      where: {id : groupId},
      attributes:['id', 'group_name','start_date'],
      include:[
        { 
          association: 'members',
          attributes: ['pay']
        },
      ]
    });
  }

  /***************** group detail id wise  ****************/
  Group.groupDetail = function(id){
    return this.findOne({
      where : {id : id},
      attributes:['id', 'group_name','created_by','start_date','created_at'],
      include:[
        { 
          association: 'members',
          attributes: ['deposit','pay','pay_share','admin','user_id','created_at'],
          include:[{ association:'user',attributes: ['name'],required: false }],
        },
      ],
    });
  }

  /***************** group expense detail with groupid wise  ****************/
  Group.groupExpenseDetail = function(gid){
    return this.findOne({
      where : {id : gid},
      attributes:['id', 'group_name'],
      include:[
        { 
          association: 'pay',
          attributes: ['id','payby','paydate','description','category','amount','addedby','sharewith'],
          include:[
            { association:'paymentUser',attributes: ['name'],required: false },
            { association:'addedUser',attributes: ['name'],required: false },
            { 
              association:'shareUsers',
              attributes: ['user_id'],
              include:[
                { association:'userName',attributes: ['name'],required: false }
              ]
            },
          ],
        },
      ],
    });
  }

  return Group;
};