'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('payments', {
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
      payby: {
        type: Sequelize.INTEGER,
        onDelete: 'CASCADE',
        allowNull: false,
        references: {
          model: 'users',
          key: 'id',
          as: 'payby'
        },
      },
      paydate: {
        allowNull: true,
        type: Sequelize.DATE,
        field: 'paydate'
      },
      description: {
        type: Sequelize.STRING,
        field: 'description'
      },
      category: {
        type: Sequelize.STRING,
        field: 'category'
      },
      amount: {
        type: Sequelize.DOUBLE,
        allowNull: false,
      },
      addedby: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      sharewith: {
        type: Sequelize.STRING,
        field: 'sharewith'
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
    return queryInterface.dropTable('payments');
  }
};