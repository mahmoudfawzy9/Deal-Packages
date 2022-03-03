/* jshint indent: 2 */

module.exports = function (sequelize, DataTypes) {
  const book_category = sequelize.define('book_category', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    code: {
      type: DataTypes.STRING(30),
      allowNull: false
    },
    image_url: {
      type: DataTypes.STRING(200),
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
    }
  }, {
    sequelize,
    tableName: 'book_category',
    timestamps: false
  });

  book_category.associate = (models) => {
    // associations can be defined here
    book_category.belongsToMany(models.article, { through: models.article_category, foreignKey: 'category_id' });
    book_category.hasMany(models.article_category, { foreignKey: 'category_id' })
  };
  return book_category;
};
