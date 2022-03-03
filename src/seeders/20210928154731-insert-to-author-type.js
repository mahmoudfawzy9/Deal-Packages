'use strict';

const authorTypes = require('../../config/authorType')

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('author_type', authorTypes, {})
  
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('author_type', null, {})

  }
};
