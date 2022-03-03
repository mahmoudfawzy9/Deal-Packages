/* jshint indent: 2 */

module.exports = function (sequelize, DataTypes) {
    const authorType = sequelize.define('author_type', {
        id: {
            autoIncrement: true,
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
        },
        name: {
            type: DataTypes.STRING(50),
            allowNull: false
        },
        created_at: {
            allowNull: false,
            type: DataTypes.DATE,
            defaultValue: sequelize.literal('CURRENT_TIMESTAMP')
        },
        updated_at: {
            allowNull: false,
            type: DataTypes.DATE,
            defaultValue: sequelize.literal('CURRENT_TIMESTAMP')
        },
        is_deleted: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0
        }
    }, {
        sequelize,
        tableName: 'author_type',
        timestamps: false
    })
    authorType.associate = models => {
        authorType.hasMany(models.author, { foreignKey: 'author_type_id' })
    }

    return authorType
}