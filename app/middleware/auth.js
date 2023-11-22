import { AUTH_JWT_ALG, AUTH_JWT_SECRET } from '#app/config/auth.js';
import jwt from 'jsonwebtoken'

export default function checkAuth(req, resp, next){
	const header = req.headers.authorization ?? 'Bearer null';
	const [ _, token ] = header.split(' ');
	
	try{
		const tokenData = jwt.verify(token, AUTH_JWT_SECRET, { algorithms: [ AUTH_JWT_ALG ] });
		req.tokenData = tokenData;
		next();
	}
	catch(e){
		resp.status(401).end('');
	}
}