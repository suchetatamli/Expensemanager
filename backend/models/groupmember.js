'use strict';
module.exports = (sequelize, DataTypes) => {
  const GroupMember = sequelize.define('GroupMember', {
    id: {
      type:DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
      field: 'id'
    },
    group_id: {
      type:DataTypes.INTEGER,
      allowNull:false,
      field: 'group_id'
    },
    user_id: {
      type:DataTypes.INTEGER,
      allowNull:false,
      field: 'user_id'
    },
    admin: {
      type:DataTypes.INTEGER,
      allowNull:true,
      field: 'admin'
    },
    deposit: {
      type:DataTypes.DECIMAL(10,2),
      allowNull:true,
      field: 'deposit'
    },
    pay: {
      type:DataTypes.DECIMAL(10,2),
      allowNull:true,
      field: 'pay'
    },
    pay_share: {
      type:DataTypes.DECIMAL(10,2),
      allowNull:true,
      field: 'pay_share'
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
    tableName : 'group_members',
    underscored: true,
  });
  GroupMember.associate = function(models) {
    // associations can be defined here
    GroupMember.belongsTo(models.User,{as:'user',foreignKey:'user_id'});
  };
  return GroupMember;
};