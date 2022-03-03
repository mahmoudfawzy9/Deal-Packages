/* jshint indent: 2 */

module.exports = function (sequelize, DataTypes) {

    const author = sequelize.define('author', {
        id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: DataTypes.INTEGER
        },
        first_name: {
            type: DataTypes.STRING(50),
            allowNull: false
        },
        last_name: {
            type: DataTypes.STRING(50),
            allowNull: false
        },
        author_type_id: {
            type: DataTypes.INTEGER,
            references: {
                model: {
                    tableName: 'author_type',
                },
                key: 'id'
            },
            allowNull: false
        },
        gender: {
            type: DataTypes.ENUM('female', 'male'),
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
        tableName: 'author',
        timestamps: false
    })

    author.associate = models => {
        author.belongsTo(models.author_type, { foreignKey: 'author_type_id' })
    }

    return author
}