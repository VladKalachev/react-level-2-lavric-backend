import { DataTypes } from 'sequelize'
import sequelize from '#app/globals/sequelize.js';
import User from './user.js';

const Todo = sequelize.define('Todo', {
	id: {
		type: DataTypes.INTEGER,
		autoIncrement: true,
		primaryKey: true
	},
	title: {
		type: DataTypes.STRING,
		allowNull: false
	},
	completed: {
		type: DataTypes.BOOLEAN,
		defaultValue: false
	}
});

User.hasMany(Todo, {
	foreignKey: 'userId'
});

Todo.belongsTo(User, {
	foreignKey: 'userId'
});

export default Todo;