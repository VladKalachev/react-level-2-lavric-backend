import { DataTypes } from 'sequelize'
import sequelize from '#app/globals/sequelize.js';

const User = sequelize.define('User',
	{
		id: {
			type: DataTypes.INTEGER,
			autoIncrement: true,
			primaryKey: true
		},
		name: {
			type: DataTypes.STRING,
			allowNull: false
		},
		username: {
			type: DataTypes.STRING,
			allowNull: false
		},
		email: {
			type: DataTypes.STRING,
			allowNull: false
		},
		password: {
			type: DataTypes.STRING,
			allowNull: false
		},
		phone: {
			type: DataTypes.STRING,
			allowNull: false
		},
		website: {
			type: DataTypes.STRING,
			allowNull: false
		},
		address: {
			type: DataTypes.JSON,
			allowNull: false
		},
		company: {
			type: DataTypes.JSON,
			allowNull: false
		}
	}, 
	{
		sequelize,
		defaultScope: {
			attributes: {
				exclude: ['password', 'createdAt', 'updatedAt']
			}
		},
		scopes: {
			hidden: {
				attributes: {}
			}
		}
	}
);

export default User;