'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.addColumn('book_category', 'image_url',
      {
        type: Sequelize.STRING(200),
        allowNull: true
      }
    )
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.removeColumn('book_category', 'image_url')
  }
};
