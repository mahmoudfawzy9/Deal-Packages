'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('article_category', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      article_id: {
        type: Sequelize.INTEGER,
        references: {
          model: {
            tableName: 'article',
          },
          key: 'id'
        },
        allowNull: false
      },
      category_id: {
        type: Sequelize.INTEGER,
        references: {
          model: {
            tableName: 'book_category',
          },
          key: 'id'
        },
        allowNull: false
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
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('article_category');
  }
};