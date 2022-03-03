'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('article', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      author_id: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      title: {
        type: Sequelize.STRING(255),
        allowNull: false
      },
      subtitle: {
        type: Sequelize.STRING(255),
        allowNull: false
      },
      body: {
        type: Sequelize.STRING(512),
        allowNull: false
      },
      comment: {
        type: Sequelize.STRING(512),
        allowNull: false
      },
      image_url: {
        type: Sequelize.STRING(512),
        allowNull: false
      },
      lang_id: {
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
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('article');
  }
};