'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('author', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      first_name: {
        type: Sequelize.STRING(50),
        allowNull: false
      },
      last_name: {
        type: Sequelize.STRING(50),
        allowNull: false
      },
      author_type_id: {
        type: Sequelize.INTEGER,
        references: {
          model: {
            tableName: 'author_type',
          },
          key: 'id'
        },
        allowNull: false
      },
      gender: {
        type: Sequelize.ENUM('female', 'male'),
        allowNull:false
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      },
      is_deleted: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0
      }
    })
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('author')
  }
};
