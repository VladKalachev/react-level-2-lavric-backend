import Post from "#app/models/post.js";
import { ValidationError } from "sequelize";

export async function byUser(req, resp){
	const data = await Post.findAll({
		where: { userId: req.params.userId }
	});
	
	resp.end(JSON.stringify(data));
}

export async function index(_req, resp){
	const data = await Post.findAll({
		order: [[ 'id', 'ASC' ]]
	});

	resp.end(JSON.stringify(data));
}

export async function show(req, resp){
	const data = await Post.findOne({
		where: { id: req.params.postId }
	});
	
	resp.status(data === null ? 404 : 200).end(JSON.stringify(data));
}

export async function store(req, resp){
	const { title, body } = req.body;

	try{
		const post = await Post.create({ title, body, userId: req.tokenData.id });
		resp.end(JSON.stringify(post));
	}
	catch(e){
		if(e instanceof ValidationError){
			resp.status(422).end(JSON.stringify(e.errors.map(e => e.message)));
		}
		else{
			//log error to file
			console.log(error);
			resp.status(500).end('');
		}
	}
}

export async function destroy(req, resp){
	const post = await Post.findOne({
		where: { id: req.params.postId }
	});
	
	if(post === null){
		resp.status(404).end('');
		return;
	}

	if(post.userId !== req.tokenData.id){
		resp.status(403).end('it is alien post');
		return;
	}

	await post.destroy();
	resp.status(200).end(JSON.stringify(true));
}

export async function update(req, resp){
	const post = await Post.findOne({
		where: { id: req.params.postId }
	});
	
	if(post === null){
		resp.status(404).end('');
		return;
	}

	if(post.userId !== req.tokenData.id){
		resp.status(403).end('it is alien post');
		return;
	}

	try{
		const { title, body } = req.body;
		await post.update({ title, body });
		resp.end(JSON.stringify(post));
	}
	catch(e){
		if(e instanceof ValidationError){
			resp.status(422).end(JSON.stringify(e.errors.map(e => e.message)));
		}
		else{
			//log error to file
			console.log(error);
			resp.status(500).end('');
		}
	}
}