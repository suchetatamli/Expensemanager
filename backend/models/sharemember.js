'use strict';
module.exports = (sequelize, DataTypes) => {
  const ShareMember = sequelize.define('ShareMember', {
    id: {
      type:DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
      field: 'id'
    },
    payment_id: {
      type:DataTypes.INTEGER,
      allowNull:false,
      field: 'payment_id'
    },
    user_id: {
      type:DataTypes.INTEGER,
      allowNull:false,
      field: 'user_id'
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
    tableName : 'share_members',
    underscored: true,
  });
  ShareMember.associate = function(models) {
    // associations can be defined here
    ShareMember.belongsTo(models.User,{as:'userName',foreignKey:'user_id'});
  };
  return ShareMember;
};