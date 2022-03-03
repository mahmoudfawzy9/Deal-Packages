/* jshint indent: 2 */

module.exports = function (sequelize, DataTypes) {
  const article = sequelize.define('article', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    author_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    title: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    subtitle: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    body: {
      type: DataTypes.STRING(512),
      allowNull: false
    },
    comment: {
      type: DataTypes.STRING(512),
      allowNull: false
    },
    image_url: {
      type: DataTypes.STRING(512),
      allowNull: false
    },
    lang_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    created_at: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: sequelize.literal('CURRENT_TIMESTAMP')
    },
    updated_at: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: sequelize.literal('CURRENT_TIMESTAMP')
    },
    is_deleted: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    },

  }, {
    sequelize,
    tableName: 'article',
    timestamps: false
  });

  article.associate = (models) => {
    // associations can be defined here
    article.belongsToMany(models.book_category, { through: models.story_category, foreignKey: 'story_id' });
    article.hasMany(models.artifact, { foreignKey: 'story_id' });
    article.belongsTo(models.story_type, { foreignKey: 'type_id' });
    article.hasMany(models.article_author, { foreignKey: 'article_id' });
  };
  return article;
};
