import { DataTypes } from 'sequelize'
import sequelize from '#app/globals/sequelize.js';
import User from './user.js';

const Post = sequelize.define('Post', {
	id: {
		type: DataTypes.INTEGER,
		autoIncrement: true,
		primaryKey: true
	},
	title: {
		type: DataTypes.STRING,
		allowNull: false,
		validate: {
			len: [ 5, 255 ]
		}
	},
	body: {
		type: DataTypes.STRING,
		allowNull: false,
		validate: {
			len: [ 5, 255 ]
		}
	}
});

User.hasMany(Post, {
	foreignKey: 'userId'
});

Post.belongsTo(User, {
	foreignKey: 'userId'
});

export default Post;