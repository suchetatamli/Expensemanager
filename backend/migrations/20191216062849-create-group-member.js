'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('group_members', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      group_id: {
        type: Sequelize.INTEGER,
        onDelete: 'CASCADE',
        allowNull: false,
        references: {
          model: 'groups',
          key: 'id',
          as: 'group_id'
        },
      },
      user_id: {
        type: Sequelize.INTEGER,
        onDelete: 'CASCADE',
        allowNull: false,
        references: {
          model: 'users',
          key: 'id',
          as: 'user_id'
        },
      },
      deposit: {
        type: Sequelize.DOUBLE,
        allowNull: true,
      },
      pay: {
        type: Sequelize.DOUBLE,
        allowNull: true,
      },
      payShare: {
        type: Sequelize.DOUBLE,
        allowNull: true,
        field: 'pay_share'
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        field: 'created_at',
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        field: 'updated_at',
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      }
    },
    {
      engine: 'MYISAM',                     // default: 'InnoDB'
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('group_members');
  }
};