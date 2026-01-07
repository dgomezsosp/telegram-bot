module.exports = function (sequelize, DataTypes) {
  const Model = sequelize.define('Customer',
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: 'Por favor, rellena el campo "Nombre".'
          },
          notEmpty: {
            msg: 'Por favor, rellena el campo "Nombre".'
          }
        }
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          isEmail: {
            msg: 'Debe ser um e-mail válido'
          },
          notNull: {
            msg: 'Por favor, rellena el campo "Email".'
          },
          notEmpty: {
            msg: 'Por favor, rellena el campo "Email".'
          }
        }
      },
      telegramId: {
        type: DataTypes.STRING,
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
    }, {
    sequelize,
    tableName: 'customers',
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
      }
    ]
  }
  )

  Model.associate = function (models) {

  }

  return Model
}
