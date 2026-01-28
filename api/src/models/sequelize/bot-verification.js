module.exports = function (sequelize, DataTypes) {
  const Model = sequelize.define('BotVerification',
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          isEmail: {
            args: true,
            msg: 'Debe ser un e-mail válido'
          },
          notNull: {
            msg: 'Por favor, rellena el campo "Email".'
          },
          notEmpty: {
            msg: 'Por favor, rellena el campo "Email".'
          }
        }
      },
      verificationCode: {
        type: DataTypes.STRING(6),
        allowNull: false,
        validate: {
          notNull: {
            msg: 'Por favor, rellena el campo "Código de verificación".'
          },
          notEmpty: {
            msg: 'Por favor, rellena el campo "Código de verificación".'
          },
          len: {
            args: [6, 6],
            msg: 'El código debe tener exactamente 6 caracteres.'
          }
        }
      },
      telegramUserId: {
        type: DataTypes.STRING,
        allowNull: true
      },
      createdAt: {
        type: DataTypes.DATE,
        get() {
          return this.getDataValue('createdAt')
            ? this.getDataValue('createdAt').toISOString().split('T')[0]
            : null
        }
      },
      updatedAt: {
        type: DataTypes.DATE,
        get() {
          return this.getDataValue('updatedAt')
            ? this.getDataValue('updatedAt').toISOString().split('T')[0]
            : null
        }
      }
    },
    {
      sequelize,
      tableName: 'bot_verifications',
      timestamps: true,
      paranoid: true,
      indexes: [
        {
          name: 'PRIMARY',
          unique: true,
          using: 'BTREE',
          fields: [
            { name: 'id' }
          ]
        },
        {
          name: 'email_code_index',
          using: 'BTREE',
          fields: [
            { name: 'email' },
            { name: 'verificationCode' }
          ]
        },
        {
          name: 'telegram_user_id_index',
          using: 'BTREE',
          fields: [
            { name: 'telegramUserId' }
          ]
        }
      ]
    }
  )

  Model.associate = function (models) {
    // Si en el futuro quieres asociar con Customer:
    // Model.belongsTo(models.Customer, { foreignKey: 'customerId' })
  }

  return Model
}
