const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");

// Create our Post Model
class Post extends Model {}

// create fields/columns for Post model
Post.init(
    // first parameter sets schema
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    post_url: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isURL: true,
      },
    },
    user_id: {
      type: DataTypes.INTEGER,
      references: {
        model: "user",
        key: "id",
      },
    },
    },
    //second parameter configures metadata including naming conventions
  {
    sequelize,
    freezeTableName: true,
    underscored: true,
    modelName: "post",
  }
);

// export expression
module.exports = Post;
