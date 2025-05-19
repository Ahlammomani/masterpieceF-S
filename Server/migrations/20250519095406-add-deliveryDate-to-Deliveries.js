'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn('Deliveries', 'deliveryDate', {
  type: Sequelize.DATEONLY,
  allowNull: true, // أو true حسب رغبتك
});
  },

  async down (queryInterface, Sequelize) {
  await queryInterface.removeColumn('Deliveries', 'deliveryDate');
  }
};
