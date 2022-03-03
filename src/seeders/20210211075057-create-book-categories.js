'use strict';
const bookCategories = require("../../config/bookCategories");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('book_category', bookCategories, {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('book_category', null, {});
  }
};
