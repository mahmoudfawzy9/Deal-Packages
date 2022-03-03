'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('article_author', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      article_id: {
        type: Sequelize.INTEGER,
        allowNull:false,
        references: {
          model: {
            tableName: 'article',
          },
          key: 'id'
        },
      },
      author_id:{
        type: Sequelize.INTEGER,
        allowNull: false
      },
      author_type_id:{
        type: Sequelize.INTEGER,
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
    })
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.drop_table('article_author')
  }
};
