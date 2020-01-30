'use strict';
module.exports = (sequelize, DataTypes) => {
  const Payment = sequelize.define('Payment', {
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
    payby: {
      type:DataTypes.INTEGER,
      allowNull:false,
      field: 'payby'
    },
    paydate: {
      type: DataTypes.DATE,
      allowNull: true,
      field: 'paydate'
    },
    description: {
      type:DataTypes.STRING,
      allowNull:false,
      field: 'description'
    },
    category: {
      type:DataTypes.STRING,
      allowNull:false,
      field: 'category'
    },
    amount: {
      type:DataTypes.DECIMAL(10,2),
      allowNull:false,
      field: 'amount'
    },
    addedby: {
      type:DataTypes.INTEGER,
      allowNull:false,
      field: 'addedby'
    },
    editby: {
      type:DataTypes.INTEGER,
      allowNull:true,
      field: 'editby'
    },
    sharewith: {
      type: DataTypes.STRING,
      allowNull: true,
      field: 'sharewith'
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
    tableName : 'payments',
    underscored: true,
  });
  Payment.associate = function(models) {
    // associations can be defined here
    Payment.hasMany(models.ShareMember, {
      as : 'shareUsers', 
      foreignKey : 'payment_id'
    });
    Payment.belongsTo(models.User,{as:'paymentUser',foreignKey:'payby'});
    Payment.belongsTo(models.User,{as:'addedUser',foreignKey:'addedby'});
  };

  /****** insert group and group member detail ******/
  Payment.insertPay = function (data){
    return Payment.create(data,{
      include: [ {
          association: 'shareUsers',
        }
      ]
    });
  }

  return Payment;
};