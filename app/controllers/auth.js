import { AUTH_JWT_ALG, AUTH_JWT_LIFETIME, AUTH_JWT_SECRET } from "#app/config/auth.js";
import User from "#app/models/user.js";
import { compare } from "bcrypt";
import jwt from 'jsonwebtoken'

export async function login(req, resp){
	const { email, password } = req.body;
	const errors = [];
	let token = null;

	if(!email){
		errors.push('empty email');
	}

	if(!password){
		errors.push('empty password');
	}

	if(errors.length === 0){
		const user = await User.scope('hidden').findOne({ where: { email } });

		if(user === null || !(await compare(password, user.password))){
			errors.push('wrong credentials');
		}
		else{
			token = jwt.sign({ 
				id: user.id,
				name: user.username
			}, AUTH_JWT_SECRET, { algorithm: AUTH_JWT_ALG, expiresIn: AUTH_JWT_LIFETIME });
		}
	}

	const data = (errors.length === 0) ? { success: true, token } : { success: false, errors };
	resp.end(JSON.stringify(data));
}

export async function check(req, resp){
	const header = req.headers.authorization ?? 'Bearer null';
	const [ _, token ] = header.split(' ');
	let res;

	try{
		const data = jwt.verify(token, AUTH_JWT_SECRET, { algorithms: [ AUTH_JWT_ALG ] });
		const user = await User.findOne({ where: { id: data.id } });
		
		if(user === null){
			throw {};
		}

		res = { auth: true, user };
	}
	catch(e){
		res = { auth: false };
	}

	setTimeout(() => resp.end(JSON.stringify(res)), 200);
}