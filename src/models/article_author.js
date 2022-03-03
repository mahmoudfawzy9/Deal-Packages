/* jshint indent: 2 */

module.exports = function (sequelize, DataTypes) {
    const storyAuthor = sequelize.define('article_author', {
        id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: DataTypes.INTEGER
        },
        article_id: {
            allowNull: false,
            type: DataTypes.INTEGER,
            references: {
                model: {
                    tableName: 'article',
                },
                key: 'id'
            },
        },
        author_id: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        author_type_id: {
            type: DataTypes.INTEGER,
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
        tableName: 'article_author',
        timestamps: false
    });

    articleAuthor.associate = (models) => {
        articleAuthor.belongsTo(models.article, { foreignKey: 'article_id' })
    }

    return articleAuthor
}