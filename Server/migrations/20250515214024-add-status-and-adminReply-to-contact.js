'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn('Contacts', 'status', {
      type: Sequelize.ENUM("Read", "Unread"),
      defaultValue: "Unread",
    });

    await queryInterface.addColumn('Contacts', 'adminReply', {
      type: Sequelize.TEXT,
      allowNull: true,
    });
  },

  async down (queryInterface, Sequelize) {
     await queryInterface.removeColumn('Contacts', 'status');
    await queryInterface.removeColumn('Contacts', 'adminReply');
  }
};
