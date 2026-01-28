'use strict'

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('bot_verifications', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
      },
      email: {
        type: Sequelize.STRING,
        allowNull: false
      },
      verificationCode: {
        type: Sequelize.STRING(6),
        allowNull: false
      },
      telegramUserId: {
        type: Sequelize.STRING,
        allowNull: true
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false
      },
      deletedAt: {
        type: Sequelize.DATE
      }
    })

    // Índice para buscar rápidamente por email y código
    await queryInterface.addIndex('bot_verifications', ['email', 'verificationCode'], {
      name: 'email_code_index'
    })

    // Índice para buscar por telegramUserId
    await queryInterface.addIndex('bot_verifications', ['telegramUserId'], {
      name: 'telegram_user_id_index'
    })
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('bot_verifications')
  }
}
